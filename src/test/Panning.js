import { useEffect } from 'react';
import { useGoogleMap } from '@react-google-maps/api';
import useGeolocation from '../hooks/useGeolocation';

const Panning = () => {

  const map = useGoogleMap();

  const coordinates = useGeolocation();
  const { latitude, longitude } = coordinates;

  useEffect(() => {

    if(map){

      map.panTo({ lat: latitude, lng: longitude });
      map.setZoom(8);

    }

  }, [map])

  return null;
}

export default Panning
