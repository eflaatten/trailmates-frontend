import axios from "axios";
const BASE_URL = "https://trailmates-backend.vercel.app/api";

export const geocodeLocation = async (locationName) => {
  try {
    const url = `${BASE_URL}/maps/geocode?location=${encodeURIComponent(locationName)}`;
    const response = await axios.get(url);

    // Extract the first result's coordinates
    const { results } = response.data;
    if (results && results.length > 0) {
      const { lat, lng } = results[0].geometry.location;
      return { lat, lng };
    }

    throw new Error(`No coordinates found for location: ${locationName}`);
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error;
  }
};
