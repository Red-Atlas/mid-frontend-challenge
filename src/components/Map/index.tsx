import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '../../services/PropertiesService';
import "./styles.css"

interface LocationInfo {
  location: Location;
  locationName: string;
}

interface MapProps {
  locationInfo: LocationInfo[];
  zoomLevel: number;
}

export const Map: React.FC<MapProps> = ({ locationInfo, zoomLevel }) => {
  const [visibleMarkers, setVisibleMarkers] = useState<L.Marker[]>([]);

  useEffect(() => {
    if (locationInfo.length === 0) return;

    const map = L.map('map', {
      center: [locationInfo[0].location.lat || 0, locationInfo[0].location.lng || 0],
      zoom: zoomLevel,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const loadVisibleMarkers = () => {
      const bounds = map.getBounds(); // Obtiene los límites visibles del mapa (viewport)
      
      const visibleProperties = locationInfo.filter(({ location }) => {
        const latLng = L.latLng(location.lat, location.lng);
        return bounds.contains(latLng);  // Verifica si la propiedad está dentro de los límites
      });

      const newMarkers = visibleProperties.map(({ location, locationName }) => {
        const marker = L.marker([location.lat, location.lng]).addTo(map);
        marker.bindPopup(`<b>${locationName}</b>`);

        marker.on('mouseover', () => {
          marker.openPopup();
        });

        marker.on('mouseout', () => {
          marker.closePopup();
        });

        return marker;
      });

      setVisibleMarkers(newMarkers);
    };

    loadVisibleMarkers();

    map.on('moveend', loadVisibleMarkers);
    map.on('zoomend', loadVisibleMarkers);

    return () => {
      visibleMarkers.forEach(marker => {
        map.removeLayer(marker);
      });
      map.remove();
    };
  }, [locationInfo, zoomLevel]);

  return (
    <div
      className='map__container'
      id="map"
    />
  );
};
