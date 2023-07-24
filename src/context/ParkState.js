import React, { useReducer } from 'react';
import ParkContext from './parkContext';
import ParkReducer from './ParkReducer';
import {
  REVERSE_GEO,
  FIND_MARKERS,
  SEARCH_PARKS,
  SEARCH_PARKS_COORDS,
  SEARCH_PARKS_ADDRESS,
  SET_SHOW_SEARCH,
  SET_MARKERS,
  SET_POSITION,
  SET_LOADING,
  SET_ERROR,
  CLEAR_MARKERS } from './actions';

import axios from 'axios';


const AdventureState = (props) => {

  const initialState = {
    parks: {},
    searches: {},
    searchCoords: null,
    showSearch: false,
    markers: [],
    geoAddress: {},
    parkAddress: null,
    error: null,
    alert: null,
    loading: false
  }


  const [state, dispatch] = useReducer(ParkReducer, initialState);


  // get park data based on user's input search
  const searchParks = async (text) => {

    try {

      const response = await axios.get(`https://developer.nps.gov/api/v1/parks?q=${text}&limit=500&api_key=${process.env.REACT_APP_NPS_API_KEY}`);

      dispatch({
        type: SEARCH_PARKS,
        payload: response.data
      });

    } catch(error){

      dispatch({
        type: SET_ERROR,
        payload: error.response.msg
      });

    };

  };


  // get coordinates from park search for populating nearby parks
  const searchParksCoords = (coords) => {

    dispatch({
      type: SEARCH_PARKS_COORDS,
      payload: coords
    });

  };


  // get the searched park data for address
  const searchParksAddress = (park) => {

    dispatch({
      type: SEARCH_PARKS_ADDRESS,
      payload: park
    });

  };


  // toggles search results
  const setShowSearch = (boolean) => {

    dispatch({
      type: SET_SHOW_SEARCH,
      payload: boolean
    });

  };


  // gets address data based on the geolocation coordinates
  const reverseGeo = async (coordinates) => {

    const { latitude, longitude } = coordinates;

    try {

      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);

      dispatch({
        type: REVERSE_GEO,
        payload: response.data
      });

    } catch(error){

      dispatch({
        type: SET_ERROR,
        payload: error.response.msg
      });

    };

  };


  // gets parks data based on coordinates search
  const findMarkers = async () => {

    try {

      const response = await axios.get(`https://developer.nps.gov/api/v1/parks?limit=500&api_key=${process.env.REACT_APP_NPS_API_KEY}`);

      dispatch({
        type: FIND_MARKERS,
        payload: response
      });

    } catch(error){

      dispatch({
        type: SET_ERROR,
        payload: error.response.msg
      });

    };

  };


  // filters markers based on user's coordinates
  const setMarkers = (park) => {

    dispatch({
      type: SET_MARKERS,
      payload: park
    });

  };


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


  // clears markers
  const clearMarkers = () => {

    dispatch({
      type: CLEAR_MARKERS
    });

  };


  return (
    <ParkContext.Provider value={{
      parks: state.parks,
      searches: state.searches,
      searchCoords: state.searchCoords,
      markers: state.markers,
      geoAddress: state.geoAddress,
      parkAddress: state.parkAddress,
      showSearch: state.showSearch,
      searchParks,
      searchParksCoords,
      searchParksAddress,
      setShowSearch,
      reverseGeo,
      findMarkers,
      setPosition,
      setMarkers,
      setLoading,
      setError,
      clearMarkers
    }}>
      {props.children}
    </ParkContext.Provider>
  );
};

export default AdventureState;
