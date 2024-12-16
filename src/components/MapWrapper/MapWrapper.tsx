import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import { usePropertiesContext } from "../../contexts/PropertiesContext";
import "./MapWrapper.css";
import MapPopupContent from "./MapPopupContent";
import { createRoot } from "react-dom/client";

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { visibleProperties } = usePropertiesContext();

  useEffect(() => {
    console.log("Loading map");
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: [-66.664513, 18.200178],
        zoom: 9,
        maxZoom: 19,
      });

      console.log("Map loaded");

      // Clean up on unmount
      return () => {
        console.log("Unmounting map");
        map.current?.remove();
      };
    }
  }, []);

  useEffect(() => {
    if (!map.current) return;

    const mapInstance = map.current;

    if (!mapInstance.isStyleLoaded()) {
      mapInstance.once("styledata", () => {
        addOrUpdateSourceAndLayers(mapInstance, visibleProperties);
      });
    } else {
      addOrUpdateSourceAndLayers(mapInstance, visibleProperties);
    }
  }, [visibleProperties]);

  function addOrUpdateSourceAndLayers(
    mapInstance: mapboxgl.Map,
    properties: any[]
  ) {
    const sourceId = "properties";

    if (mapInstance.getSource(sourceId)) {
      const source = mapInstance.getSource(sourceId) as mapboxgl.GeoJSONSource;
      source.setData({
        type: "FeatureCollection",
        features: properties.map((property) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [property.location.lng, property.location.lat],
          },
          properties: {
            id: property.id,
            title: property.title,
            description: property.description,
            price: property.price,
          },
        })),
      });
    } else {
      mapInstance.on("moveend", (e) => {
        const bounds = e.target.getBounds();

        console.log("EL MAPA SE MOVIÓ", {
          ne: bounds?.getNorthEast(),
          nw: bounds?.getNorthWest(),
          se: bounds?.getSouthEast(),
          sw: bounds?.getSouthWest(),
        });
      });

      mapInstance.addSource(sourceId, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: properties.map((property) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [property.location.lng, property.location.lat],
            },
            properties: {
              id: property.id,
              title: property.title,
              description: property.description,
              price: property.price,
            },
          })),
        },
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      mapInstance.addLayer({
        id: "clusters",
        type: "circle",
        source: sourceId,
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#51bbd6",
            100,
            "#f1f075",
            750,
            "#f28cb1",
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20,
            100,
            30,
            750,
            40,
          ],
        },
      });

      mapInstance.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: sourceId,
        filter: ["has", "point_count"],
        layout: {
          "text-field": ["get", "point_count_abbreviated"],
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      });

      mapInstance.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: sourceId,
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#11b4da",
          "circle-radius": 6,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff",
        },
      });

      mapInstance.on("click", "clusters", (e) => {
        console.log("Acercando al cluster");

        const features = mapInstance.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });

        if (!features.length) return;
        console.log(features);

        const clusterId = features[0].properties?.clusterId;

        const source: mapboxgl.GeoJSONSource = mapInstance.getSource(
          sourceId
        ) as mapboxgl.GeoJSONSource;
        source.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;

          if (features[0].geometry.type === "Point") {
            const coordinates = features[0].geometry.coordinates;

            mapInstance.easeTo({
              center: [coordinates[0], coordinates[1]],
              zoom: zoom || 9,
            });
          }
        });
      });

      mapInstance.on("click", "unclustered-point", (e) => {
        if (!e.features || e.features[0].geometry.type !== "Point") return;

        const currencyFormatter = new Intl.NumberFormat("es-AR", {
          style: "currency",
          currency: "USD",
        });

        const coordinates = e.features[0].geometry.coordinates.slice();

        const title = e.features[0].properties?.title;
        const price = currencyFormatter.format(e.features[0].properties?.price);

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        const popupContainer = document.createElement("div");

        const popup = new mapboxgl.Popup({ closeButton: false })
          .setLngLat([coordinates[0], coordinates[1]])
          .setDOMContent(popupContainer)
          .addTo(mapInstance);

        const root = createRoot(popupContainer);
        root.render(
          <MapPopupContent
            title={title}
            price={price}
            onClose={() => {
              popup.remove();
              root.unmount();
            }}
          />
        );
      });

      mapInstance.on("mouseenter", "clusters", () => {
        mapInstance.getCanvas().style.cursor = "pointer";
      });

      mapInstance.on("mouseleave", "clusters", () => {
        mapInstance.getCanvas().style.cursor = "";
      });

      mapInstance.on("mouseenter", "unclustered-point", () => {
        mapInstance.getCanvas().style.cursor = "pointer";
      });

      mapInstance.on("mouseleave", "unclustered-point", () => {
        mapInstance.getCanvas().style.cursor = "";
      });
    }
  }

  return (
    <div
      ref={mapContainer}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
}
