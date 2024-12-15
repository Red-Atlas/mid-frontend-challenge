import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showSnackbar } from '../../reducers/snackbarSlice';
import { RootState } from '../../store';
import './map-layout.css';

function MapLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map>();
  const { property } = useSelector((state: RootState) => state.properties);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (process.env.REACT_APP_MAPBOX_TOKEN) {
      mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    } else {
      dispatch(showSnackbar({
        message: 'Token for Mapbox is Invalid',
        severity: 'error',
      }));
    }
  }, [dispatch]);

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
  </div>;
}


export default MapLayout;
