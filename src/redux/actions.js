import axios from "axios";
import { getToken } from "../api/auth"; 

const BASE_URL = "https://trailmates-backend.vercel.app/api";

// Action Types
export const GET_TRIPS = "GET_TRIPS";
export const CREATE_TRIP = "CREATE_TRIP";
export const DELETE_TRIP = "DELETE_TRIP";
export const FETCH_ROUTE = "FETCH_ROUTE";
export const FETCH_POIS = "FETCH_POIS"; 
export const ERROR = "ERROR";

// Fetch User Trips and Dispatch to Redux
export const getUserTrips = () => async (dispatch) => {
  const token = getToken();

  if (!token) {
    console.error("No token found, user might not be logged in");
    dispatch({ type: ERROR, payload: "No token found" });
    return;
  }

  try {
    const response = await axios.get(`${BASE_URL}/trips/getUserTrips`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      dispatch({ type: GET_TRIPS, payload: response.data });
    } else {
      console.error("Unexpected response status:", response.status);
      dispatch({ type: ERROR, payload: "Unexpected response status" });
    }
  } catch (error) {
    console.error("Get trips error details:", error);
    dispatch({ type: ERROR, payload: "Error getting trips" });
  }
};

// CREATE_TRIP ACTION
export const createTrip = (tripData) => async (dispatch) => {
  const token = getToken();
  console.log("Token: ", token);
  console.log("Trip Data: ", tripData); // Log trip data before sending

  if (!token) {
    console.error("No token found, user might not be logged in");
    throw new Error("No token found, user might not be logged in");
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/trips/createTrip`,
      tripData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Create trip response:", response); // Log the response

    if (response.status === 200) {
      dispatch({ type: CREATE_TRIP, payload: response.data });
    } else {
      console.error("Unexpected response status:", response.status);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Create trip error details:", error);
    throw error;
  }
};

export const deleteTrip = (tripId) => async (dispatch) => {
  const token = getToken();
  console.log("deleting trip with id:", tripId);

  if (!token) {
    console.error("No token found, user might not be logged in");
    throw new Error("No token found, user might not be logged in");
  }

  try {
    const response = await axios.delete(`${BASE_URL}/trips/deleteTrip/${tripId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Delete trip response:", response);

    if (response.status === 200) {
      dispatch({
        type: DELETE_TRIP,
        payload: tripId,
      })
      dispatch(getUserTrips());
    } else {
      console.error("Unexpected response status:", response.status);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Delete trip error details:", error);
    throw error;
  }
}

// MAP ACTIONS

// Fetch Route
export const fetchRoute = (origin, destination) => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/maps/routes`, { params: { origin, destination } });
    dispatch({ type: "FETCH_ROUTE", payload: response.data.polyline });
    return response.data;
  } catch (error) {
    console.error("Error fetching route:", error);
    dispatch({ type: "ERROR", payload: "Error fetching route" });
  }
};

// Fetch POIs along the route
export const fetchPOIs = ({ waypoints }) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}/maps/pois`, { waypoints });
    dispatch({ type: "FETCH_POIS", payload: response.data });
    console.log("POIs:", response.data);
  } catch (error) {
    console.error("Error fetching POIs:", error);
    dispatch({ type: "ERROR", payload: "Error fetching POIs" });
  }
};
