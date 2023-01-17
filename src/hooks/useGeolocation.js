import { useState, useEffect } from 'react';

const useGeolocation = () => {

  const [ coordinates, setCoordinates ] = useState({ latitude: 0, longitude: 0, loaded: false });

  const callSuccess = (position) => {
    setCoordinates({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      loaded: true
    });
  };

  const callError = (error) => {
    setCoordinates({
      error
    });
  };

  useEffect(() => {

    if(!navigator.geolocation){

      callError({

        message: "Error: Geolocation is unavailable."

      })

    }

    navigator.geolocation.getCurrentPosition(callSuccess, callError);

  }, []);

  return coordinates;

}

export default useGeolocation;
