import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { getUserTrips } from "../../redux/actions";
import axios from "axios";
import { Button, Box } from "@mui/material";

const Map = ({ selectedTripId }) => {
  const dispatch = useDispatch();
  const trips = useSelector((state) => state.trips.trips);

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [startCoords, setStartCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);

  useEffect(() => {
    // Fetch user trips on mount
    dispatch(getUserTrips());
  }, [dispatch]);

  const geocodeLocation = async (location) => {
    try {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        location
      )}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
      const response = await axios.get(geocodeUrl);

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        return { lat, lng };
      } else {
        console.error(`Geocoding failed for location: ${location}`);
        return null;
      }
    } catch (error) {
      console.error("Error during geocoding:", error);
      return null;
    }
  };

  useEffect(() => {
    if (trips.length > 0 && selectedTripId) {
      const selectedTrip = trips.find((trip) => trip.tripId === selectedTripId);
      if (selectedTrip) {
        const startLocation = selectedTrip.starting_location;
        const destination = selectedTrip.destination;

        const fetchMapData = async () => {
          try {
            const originCoords = await geocodeLocation(startLocation);
            const destCoords = await geocodeLocation(destination);

            if (!originCoords || !destCoords) {
              console.error("Failed to geocode locations.");
              return;
            }

            setStartCoords(originCoords);
            setDestCoords(destCoords);

            // Get directions using the Directions API
            const directionsService =
              new window.google.maps.DirectionsService();
            directionsService.route(
              {
                origin: originCoords,
                destination: destCoords,
                travelMode: window.google.maps.TravelMode.DRIVING,
              },
              (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                  setDirectionsResponse(result);
                } else {
                  console.error(`Error fetching directions: ${status}`);
                }
              }
            );
          } catch (error) {
            console.error("Error fetching map data:", error);
          }
        };

        fetchMapData();
      }
    }
  }, [trips, dispatch, selectedTripId]);

  const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // Fallback location

  const handleOpenInGoogleMaps = () => {
    if (startCoords && destCoords) {
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${startCoords.lat},${startCoords.lng}&destination=${destCoords.lat},${destCoords.lng}&travelmode=driving`;
      window.open(mapsUrl, "_blank");
    }
  };

  return (
    <Box>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "900px" }}
        center={startCoords || defaultCenter}
        zoom={10}
      >
        {/* Render the route using DirectionsRenderer */}
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>

      {/* Button to Open Google Maps */}
      <Box sx={{ textAlign: "left", marginTop: 2 }}>
        <Button
          variant='outlined'
          onClick={handleOpenInGoogleMaps}
          disabled={!startCoords || !destCoords}
          sx={{
            borderColor: "#2196F3",
            color: "#2196F3",
            "&:hover": {
              borderColor: "#1976D2",
              backgroundColor: "transparent",
              color: "#1976D2",
              transform: "scale(1.05)", // Slightly enlarges the button
            },
            transition: "transform 0.3s ease", // Smooth transition effect
          }}
        >
          Open in Google Maps
        </Button>
      </Box>
    </Box>
  );
};

export default Map;
