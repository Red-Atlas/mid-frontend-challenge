import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';
import './map-layout.css';

import { useSelector } from 'react-redux';
import SnackbarComponent from '../../components/snackbar/snackbar';
import { Property } from '../../interfaces/properties.interface';
import SnacbkarProps from '../../interfaces/snackbar.interface';
import { RootState } from '../../store';





function MapLayout() {

  const [snackbar, setSnackbar] = useState<SnacbkarProps>({
    open: false,
    message: '',
    severity: 'success'
  });
  const [propertiesData, setProperties] = useState<Property[]>();
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map>();
  const { property } = useSelector((state: RootState) => state.properties);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);

  if (process.env.REACT_APP_MAPBOX_TOKEN) {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
  } else {
    setSnackbar({
      open: true,
      message: 'Error',
      severity: 'error',
    });
  }

  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-63, -36.5],
      zoom: 5,
    });

    setMapInstance(map)

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (mapInstance && property) {
      getPropertiesService();
    }
  }, [mapInstance, property]);

  const getPropertiesService = () => {

    markers.forEach((marker) => marker.remove());
    setMarkers([]);
    const newMarkers: mapboxgl.Marker[] = [];

    property.forEach((property) => {
      const marker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat([property.location.lng, property.location.lat])
        .addTo(mapInstance!);

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  };




  return <div className="map-container" ref={mapContainerRef}>
    <SnackbarComponent
      open={snackbar?.open}
      message={snackbar?.message}
      severity={snackbar?.severity}
    />
  </div>;
}


export default MapLayout;
