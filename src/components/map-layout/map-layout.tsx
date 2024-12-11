import React, { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import './map-layout.css'; 

import SnackbarComponent from '../../components/snackbar/snackbar';
import SnacbkarProps from '../../interfaces/snackbar.interface';
import { getProperties } from '../../services/properties.service';
import { Property } from '../../interfaces/properties.interface';





function MapLayout() {

  const [snackbar, setSnackbar] = useState<SnacbkarProps>({
    open: false,
    message: '',
    severity: 'success'
  });
  const [propertiesData, setProperties] = useState<Property[]>();
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map>();

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
    if (mapInstance) {
      getPropertiesService();
    }
  }, [mapInstance]);

  const getPropertiesService = async () => {
    try {
      const data = await getProperties();
      setProperties(data);
      console.log(mapInstance)
      if (!mapInstance) {
        console.error('El mapa no está inicializado.');
        return;
      }

      data.forEach((property) => {
        console.log(property.address)
        console.log(property.location)
        new mapboxgl.Marker({ color: 'red' })
          .setLngLat([property.location.lng, property.location.lat])
          .addTo(mapInstance);
      });
    } catch (error: any) {
      console.log(error)
    }
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
