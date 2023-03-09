import { useContext, useEffect } from 'react';
import AdventureContext from '../context/parkContext';
import useGeolocation from './useGeolocation';

const useGeoMarkers = (searchCoords) => {

  const coordinates = useGeolocation();
  const { latitude, longitude } = coordinates;

  const adventureContext = useContext(AdventureContext);
  const { parks, setMarkers } = adventureContext;

  // NPS data extracted via button click (which provides the nearby park data)
  let parkData = parks.data;


  useEffect(() => {

    if(parkData){

      parkData.data.forEach(( park ) => {

        let parkLat = park.latitude;
        let parkLng = park.longitude;

        // user starting location
        if(!searchCoords){

          if(parkLat < (latitude + 3) && parkLat > (latitude - 3) && parkLng < (longitude + 3) && parkLng > (longitude - 3)){

            setTimeout(() => {

              setMarkers(park);

            }, 250);

          } else {

            return null;

          }

          // user searches for a location
        } else if(searchCoords){

          const { lat, lng } = searchCoords;

          if(parkLat < (lat + 3) && parkLat > (lat - 3) && parkLng < (lng + 3) && parkLng > (lng - 3)){

            setTimeout(() => {

              setMarkers(park);

            }, 250 );

          } else {

            return null;

          }

        }

      })

    }

    // eslint-disable-next-line
  }, [parks])

}

export default useGeoMarkers;
