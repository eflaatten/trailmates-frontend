import { combineReducers } from "redux";
import { GET_TRIPS, CREATE_TRIP, DELETE_TRIP, FETCH_ROUTE, FETCH_POIS, ERROR } from "./actions";
import initialState from "./state";

const tripsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRIPS:
      return {
        ...state,
        trips: action.payload,
        error: null,
      };
    case CREATE_TRIP:
      return {
        ...state,
        trips: [...state.trips, action.payload],
        error: null,
      };
    case DELETE_TRIP:
      return {
        ...state,
        trips: state.trips.filter((trip) => trip.id !== action.payload),
        error: null,
      };
    case FETCH_ROUTE:
      return {
        ...state,
        routes: action.payload,
        error: null,
      };
    case FETCH_POIS:
      return {
        ...state,
        pois: action.payload,
        error: null,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  trips: tripsReducer,
});
