import axios from "axios";

const BASE_URL = "https://trailmates-backend.vercel.app/api";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getTrips = async () => {
  const token = getToken();

  if(!token) {
    console.error("No token found, user might not be logged in");
    throw new Error("No token found, user might not be logged in");
  }

  try {
    const response = await axios.get(`${BASE_URL}/trips/getTrips`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Get trips response:", response);

    if(response.status === 200) {
      return response.data;
    } else {
      console.error("Unexpected response status:", response.status);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch(error) {
    console.error("Get trips error details:", error);
    throw error;
  }

}

export const createTrip = async (tripData) => {
  const token = getToken();

  if(!token) {
    console.error("No token found, user might not be logged in");
    throw new Error("No token found, user might not be logged in");
  }

  try {
    const response = await axios.post(`${BASE_URL}/trips/createTrip`, tripData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Create trip response:", response);

    if(response.status === 200) {
      return response.data;
    } else {
      console.error("Unexpected response status:", response.status);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Create trip error details:", error);
    throw error;
  }
}

export const deleteTrip = async (tripId) => {

}

export const updateTrip = async (tripId, tripData) => {

}

export const getTripDetails = async (tripId) => {

}



