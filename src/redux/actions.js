import axios from "axios";
import { getToken } from "../api/auth"; 

const BASE_URL = "https://trailmates-backend.vercel.app/api";

// Action Types
export const GET_TRIPS = "GET_TRIPS";
export const CREATE_TRIP = "CREATE_TRIP";
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
