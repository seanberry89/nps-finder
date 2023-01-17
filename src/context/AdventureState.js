import { useReducer } from 'react';
import AdventureContext from './adventureContext';
import AdventureReducer from './adventureReducer';
import {
  REVERSE_GEO,
  FIND_MARKERS,
  SEARCH_PARKS,
  SEARCH_PARKS_COORDS,
  SET_MARKERS,
  SET_POSITION,
  SET_LOADING,
  SET_ERROR,
  SET_ALERT,
  REMOVE_ALERT } from './types';

import axios from 'axios';


const AdventureState = (props) => {

  const initialState = {
    parks: {},
    searches: {},
    searchCoords: null,
    markers: [],
    address: {},
    error: null,
    alert: null,
    loading: false
  }

  const [state, dispatch] = useReducer(AdventureReducer, initialState);


  // ask permission when component loads or when user clicks button: onClick listener
  // two functions: search for trails and trails near me
  // fetch the user coordinates via permission api / geolocation api


  // gets park data based on user's input search
  const searchParks = async (text) => {

    try {

      const response = await axios.get(`https://developer.nps.gov/api/v1/parks?q=${text}&limit=500&api_key=${process.env.REACT_APP_NPS_API_KEY}`);

      dispatch({
        type: SEARCH_PARKS,
        payload: response.data
      })

    } catch(error){

      dispatch({
        type: SET_ERROR,
        payload: error.response.msg
      })

    }

  };

  // get coordinates from park search for populating nearby parks
  const searchParksCoords = (coords) => {

    dispatch({
      type: SEARCH_PARKS_COORDS,
      payload: coords
    })

  }

  // gets address data based on the geolocation coordinates
  const reverseGeo = async (coordinates) => {

    const { latitude, longitude } = coordinates;

    try {

      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);

      dispatch({
        type: REVERSE_GEO,
        payload: response.data
      })

    } catch(error){

      dispatch({
        type: SET_ERROR,
        payload: error.response.msg
      })

    }

  };


  // gets parks data based on coordinates search
  const findMarkers = async () => {

    try {

      const response = await axios.get(`https://developer.nps.gov/api/v1/parks?limit=500&api_key=${process.env.REACT_APP_NPS_API_KEY}`);

      dispatch({
        type: FIND_MARKERS,
        payload: response
      })

    } catch(error){

      dispatch({
        type: SET_ERROR,
        payload: error.response.msg
      })

    }

  };

  const setMarkers = (park) => {

    dispatch({
      type: SET_MARKERS,
      payload: park
    })

    console.log(park);

  }

  // returns the position of the map to the geolocation coordinates
  const setPosition = (coords) => {

    dispatch({
      type: SET_POSITION,
      payload: coords
    });

  };


  // controls loading spinner:
  const setLoading = () => {

    dispatch({ type: SET_LOADING });

  };


  // controls errors:
  const setError = () => {

    dispatch({ type: SET_ERROR });

  };


  // controls alerts:
  const setAlert = (msg) => {

    dispatch({
      type: SET_ALERT,
      payload: msg
    });

    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT })
    }, 3000)

  };


  return (
    <AdventureContext.Provider value={{
      parks: state.parks,
      searches: state.searches,
      searchCoords: state.searchCoords,
      markers: state.markers,
      address: state.address,
      searchParks,
      searchParksCoords,
      reverseGeo,
      findMarkers,
      setMarkers,
      setPosition,
      setLoading,
      setError,
      setAlert
    }}>
      {props.children}
    </AdventureContext.Provider>
  )
}

export default AdventureState;
