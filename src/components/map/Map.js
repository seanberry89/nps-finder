import { Fragment, useContext, useState, useMemo } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { flexCenter } from '../../theme/CustomTheme';
import { useLoadScript, GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { v4 as uuidv4 } from 'uuid';

import Loader from './Loading';
import MarkerImage from './MarkerImage';
import MarkerAddress from './MarkerAddress';

import AdventureContext from '../../context/adventureContext';
import useGeolocation from '../../hooks/useGeolocation';
import useGeoMarkers from '../../hooks/useGeoMarkers';

const mapInfo = {

  styles: {
    height: "100vh",
    width: "100%"
  },

  options: {
    mapId: "6da87616724ec22e",
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
      position: 8
    },
    clickableIcons: false,
    keyboardShortcuts: false
  }

}

const Map = () => {

  const { isLoaded, loadError } = useLoadScript({

    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY

  });

  const adventureContext = useContext(AdventureContext);
  const { markers, searchCoords, setAlert } = adventureContext;

  const coordinates = useGeolocation();
  const { latitude, longitude } = coordinates;

  useGeoMarkers(searchCoords);

  const [ selected, setSelected ] = useState(null);

  const center = useMemo(() => (
    { lat: latitude, lng: longitude }
      // eslint-disable-next-line
  ), [coordinates.loaded]);

  const id = uuidv4();

  // Note: create a conditional to update the position of the map when the map loads, when a park is searched and selected, and when the map needs to be positioned back to the geolocation (comparison of two states: coordinates and park search)

  // undefined value because position hasn't been given the coords yet

  // Note: what if I were to use the marker coordinates as its own state for the park search?

  // useEffect(() => {
  //   if(coordinates.loaded){

  //     setPosition({ lat: latitude, lng: longitude });

  //   }
  // }, [coordinates.loaded]);


  const closeInfo = () => {

    setSelected(null);

  };


  const loadGeo = (marker) => {

    marker.setAnimation(window.google.maps.Animation.BOUNCE);

    setTimeout(() => {

      marker.setAnimation(null);

    }, 7500 );

  };


  // Note: what if I remove the value of the position when this event happens?
  // const onDragEnd = () => {

  // };


  if(!isLoaded){ return ( <Loader /> ) };
  if(loadError){ return setAlert( "this is an error message" ) };


  // Note: ternary operator can be inserted inside of prop "center," such as this: center={search ? blank : blank } or even center={{ lat: search ? blank : blank, lng: search ? blank ? blank }}

  // Note: position of map needs to change for geolocation / search of a park (and maybe re-center to geolocation too) via state switch


  return (

    <Box sx={{...flexCenter, position: "relative", height: "100vh" }}>

      { coordinates.loaded ? (

        <GoogleMap mapContainerStyle={mapInfo.styles} zoom={markers.length > 0 ? 6 : 12} center={searchCoords ? searchCoords : center} options={mapInfo.options} onClick={closeInfo}>

          { markers.length === 0 ? (

          <MarkerF position={searchCoords ? searchCoords : center} icon={{ url: 'https://cdn-icons-png.flaticon.com/512/8972/8972440.png', scaledSize: new window.google.maps.Size(50, 50) }} title="You are here" onLoad={loadGeo} />

          ) : null }

          { markers?.map((marker) => (

            <MarkerF key={marker.id} position={{ lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) }} title={marker.fullName} icon={{ url: 'https://cdn-icons-png.flaticon.com/512/3175/3175145.png', scaledSize: new window.google.maps.Size(35, 35) }} onClick={() => setSelected(marker)} animation={window.google.maps.Animation.DROP} />

          ))}

          { selected && ( <InfoWindowF position={{ lat: parseFloat(selected.latitude), lng: parseFloat(selected.longitude)}} onCloseClick={() => setSelected(null)}>

            <Fragment>

              <Stack sx={{ textAlign: "center" }} direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <Typography sx={{ color: "#487021", fontWeight: "600" }} variant="h5">{selected.fullName}</Typography>

                { selected.images && selected.images.slice(0,1).map((image) => (
                  <Box key={id}>
                    <MarkerImage image={image} />
                  </Box>
                ))}

                { selected.addresses && selected.addresses.slice(0,1).map((address) => (
                  <Box key={id}>
                    <MarkerAddress address={address} />
                  </Box>
                ))}

                <Typography variant="body2">{selected.description}</Typography>
              </Stack>

            </Fragment>

          </InfoWindowF> )}

        </GoogleMap>

      ) : ( <Loader /> )}

    </Box>

    )
  }

export default Map;
