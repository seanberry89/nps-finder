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
  CLEAR_MARKERS,
  REMOVE_ALERT } from './types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
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

    case REVERSE_GEO:
      return {
        ...state,
        address: action.payload
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

    case SET_ALERT:
    return {
      ...state,
      alert: action.payload
    }

    case CLEAR_MARKERS:
      return {
        ...state,
        markers: []
      }

    case REMOVE_ALERT:
    return {
      ...state,
      alert: null
    }

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
