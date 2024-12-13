import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';
import './map-layout.css';

import { useSelector } from 'react-redux';
import SnackbarComponent from '../../components/snackbar/snackbar';
import { Property } from '../../interfaces/properties.interface';
import SnacbkarProps from '../../interfaces/snackbar.interface';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';





function MapLayout() {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState<SnacbkarProps>({
    open: false,
    message: '',
    severity: 'success'
  });
  const [propertiesData, setProperties] = useState<Property[]>();
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map>();
  const { property } = useSelector((state: RootState) => state.properties);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (process.env.REACT_APP_MAPBOX_TOKEN) {
      mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    } else {
      setSnackbar({
        open: true,
        message: 'Mapbox token is missing',
        severity: 'error',
      });
    }
  }, []);

  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-66.5, 18.2],
      zoom: 9,
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
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';
        const marker = new mapboxgl.Marker({ element: markerElement })
          .setLngLat([property.location.lng, property.location.lat])
          .addTo(mapInstance!);
  
          marker.getElement().addEventListener('click', () => {
            navigate(`/properties/${property.id}`);
  
          });
  
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
