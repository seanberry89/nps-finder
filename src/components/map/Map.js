import { Fragment, useContext, useState, useMemo } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { flexCenter } from '../../theme/CustomTheme';
import { GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { v4 as uuidv4 } from 'uuid';

import Loader from './Loading';
import MarkerImage from './MarkerImage';
import MarkerAddress from './MarkerAddress';

import ParkContext from '../../context/parkContext';
import useGeolocation from '../../hooks/useGeolocation';
import useGeoMarkers from '../../hooks/useGeoMarkers';


const options = {

  mapId: "6da87616724ec22e",
  disableDefaultUI: true,
  zoomControl: true,
  zoomControlOptions: {
    position: 8
  },
  clickableIcons: false,
  keyboardShortcuts: false

};

const mapContainerStyle = {

  height: "100vh",
  width: "100%"

};


const Map = () => {

  const parkContext = useContext(ParkContext);
  const { markers, searchCoords, setShowSearch } = parkContext;

  const coordinates = useGeolocation();
  const { latitude, longitude } = coordinates;

  useGeoMarkers(searchCoords);

  const [ selected, setSelected ] = useState(null);

  const center = useMemo(() => (
    { lat: latitude, lng: longitude }
  ), [latitude, longitude]);


  const id = uuidv4();


  // Note: create a conditional to update the position of the map when the map loads, when a park is searched and selected, and when the map needs to be positioned back to the geolocation (comparison of two states: coordinates and park search)

  // undefined value because position hasn't been given the coords yet

  // Note: what if I were to use the marker coordinates as its own state for the park search?


  const loadGeo = (marker) => {

    marker.setAnimation(window.google.maps.Animation.BOUNCE);

    setTimeout(() => {

      marker.setAnimation(null);

    }, 7500 );

  };


  const clickMap = () => {

    setSelected(null);

    setShowSearch(false);

  };
  

  return (

    <Box sx={{ ...flexCenter, position: "relative" }}>

      { coordinates.loaded ? (

        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={markers.length > 0 ? 6 : 12} center={searchCoords ? searchCoords : center} options={options} onClick={clickMap}>

          { markers.length === 0 && (

          <MarkerF position={searchCoords ? searchCoords : center} icon={{ url: 'https://cdn-icons-png.flaticon.com/512/8972/8972440.png', scaledSize: new window.google.maps.Size(50, 50) }} title="You are here" onLoad={loadGeo} />

          ) }

          { markers?.map((marker) => (

            <MarkerF key={marker.id} position={{ lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) }} title={marker.fullName} icon={{ url: 'https://cdn-icons-png.flaticon.com/512/3175/3175145.png', scaledSize: new window.google.maps.Size(35, 35) }} onClick={() => setSelected(marker)} animation={window.google.maps.Animation.DROP} />

          )) }

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

    );
  };

export default Map;
