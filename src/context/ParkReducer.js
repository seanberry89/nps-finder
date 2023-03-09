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

const ParkReducer = (state, action) => {
  switch(action.type) {

    case SEARCH_PARKS:
      return {
        ...state,
        searches: action.payload
      }

    case SEARCH_PARKS_COORDS:
      return {
        ...state,
        searchCoords: action.payload
      }

    case SEARCH_PARKS_ADDRESS:
    return {
      ...state,
      parkAddress: action.payload
    }

    case SET_SHOW_SEARCH:
      return {
        ...state,
        showSearch: action.payload
      }

    case REVERSE_GEO:
      return {
        ...state,
        geoAddress: action.payload
      }

    case FIND_MARKERS:
      return {
        ...state,
        parks: action.payload
      }

    case SET_MARKERS:
      return {
        ...state,
        markers: [ ...state.markers, action.payload ]
      }

      // fix this
    case SET_POSITION:
      return {
        ...state,
        position: action.payload
      }

    case SET_LOADING:
    return {
      ...state,
      loading: true
    }

    case SET_ERROR:
    return {
      ...state,
      error: action.payload
    }

    case CLEAR_MARKERS:
      return {
        ...state,
        markers: []
      }

    default:
      throw new Error(`unknown action type: ${action.type}`);
  };
};

export default ParkReducer;
