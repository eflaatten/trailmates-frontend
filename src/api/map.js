import axios from "axios";
const BASE_URL = "https://trailmates-backend.vercel.app/api";

export const geocodeLocation = async (locationName) => {
  try {
    const url = `${BASE_URL}/maps/geocode`;
    const response = await axios.post(url, { location: locationName });

    // Extract and return the first result's coordinates
    const data = response.data;
    if (data && data.length > 0) {
      const { lat, lon } = data[0]; // OSM returns `lat` and `lon` instead of `geometry.location`
      return { lat, lon };
    }

    throw new Error(`No coordinates found for location: ${locationName}`);
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error;
  }
};
