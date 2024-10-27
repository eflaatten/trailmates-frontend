import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap, DirectionsRenderer, Marker } from "@react-google-maps/api";
import {
  getUserTrips,
  fetchWaypoints,
  fetchPoisForWaypoints,
} from "../../redux/actions";
import { Button, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const Map = ({ selectedTripId }) => {
  const dispatch = useDispatch();
  const trips = useSelector((state) => state.trips.trips);
  const waypoints = useSelector((state) => state.trips.waypoints || []);
  const pois = useSelector((state) => state.trips.pois || {});

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [startCoords, setStartCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);
  const [selectedPoi, setSelectedPoi] = useState(null);
  const mapRef = useRef(null);

  // Function to geocode a location address to lat/lng coordinates
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
    dispatch(getUserTrips());
  }, [dispatch]);

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

            const directionsService =
              new window.google.maps.DirectionsService();
            directionsService.route(
              {
                origin: originCoords,
                destination: destCoords,
                travelMode: window.google.maps.TravelMode.DRIVING,
              },
              async (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                  setDirectionsResponse(result);

                  const filteredWaypoints = result.routes[0].overview_path
                    .filter((_, index) => index % 40 === 0) // Increase to reduce number of waypoints
                    .map((point) => ({
                      lat: point.lat(),
                      lng: point.lng(),
                    }));

                  dispatch(fetchPoisForWaypoints(filteredWaypoints));
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

  const defaultCenter = { lat: 37.7749, lng: -122.4194 };

  const handleOpenInGoogleMaps = () => {
    if (startCoords && destCoords) {
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${startCoords.lat},${startCoords.lng}&destination=${destCoords.lat},${destCoords.lng}&travelmode=driving`;
      window.open(mapsUrl, "_blank");
    }
  };

  const handleMarkerClick = (poi) => {
    setSelectedPoi(poi);
  };

  const mapOptions = {
    streetViewControl: false,
    mapTypeControl: true,
    fullscreenControl: false,
    zoomControl: true,
  };

  return (
    <Box position='relative'>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "900px" }}
        center={startCoords || defaultCenter}
        zoom={10}
        options={mapOptions}
        onLoad={(map) => (mapRef.current = map)} // Reference to map instance
        onClick={() => setSelectedPoi(null)} // Close Box when clicking outside
      >
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}

        {/* Display waypoint markers */}
        {waypoints.map((waypoint, index) => (
          <Marker key={`waypoint-${index}`} position={waypoint} />
        ))}

        {/* Render markers for POIs */}
        {pois &&
          Object.keys(pois).map((key) =>
            pois[key].map((poi, index) => (
              <Marker
                key={`${key}-${index}`}
                position={{
                  lat: poi.geometry.location.lat,
                  lng: poi.geometry.location.lng,
                }}
                title={poi.name}
                onClick={() => handleMarkerClick(poi)}
              />
            ))
          )}
      </GoogleMap>

      {/* Custom Box for POI Info in top right corner */}
      {selectedPoi && (
        <Box
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            backgroundColor: "white",
            padding: 3,
            borderRadius: 1,
            boxShadow: 3,
            zIndex: 1000,
            width: 300, 
            "&:hover": {
              cursor: "pointer",
            },
            "@media (max-width: 600px)": {
              width: 240,
              top: 10,
              right: 10,
            }
          }}
        >
          <IconButton
            onClick={() => setSelectedPoi(null)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          {selectedPoi.photos && selectedPoi.photos.length > 0 && (
            <img
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${selectedPoi.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
              alt={selectedPoi.name}
              style={{ width: "100%", height: "auto", borderRadius: "4px", marginTop: "25px" }}
            />
          )}
          <Typography variant='h6' sx={{ mt: 2, color: "#000" }}>
            {selectedPoi.name}
          </Typography>
          <Typography variant='body2' sx={{ mt: 1, color: "#000" }}>
            {selectedPoi.vicinity}
          </Typography>

          {selectedPoi.rating && (
            <Typography variant='body2' sx={{ mt: 1, color: "#000" }}>
              Rating: {selectedPoi.rating}
            </Typography>
          )}

          {selectedPoi.opening_hours && (
            <Typography variant='body2' sx={{ mt: 1, color: "#000" }}>
              {selectedPoi.opening_hours.open_now ? "Open now" : "Closed"}
            </Typography>
          )}

          {/*GOOGLE MAPS LINK*/}
          <Button
            variant='outlined'
            onClick={() =>
              window.open(
                `https://www.google.com/maps/search/?api=1&query=${selectedPoi.geometry.location.lat},${selectedPoi.geometry.location.lng}`,
                "_blank"
              )
            }
            sx={{
              borderColor: "#2196F3",
              color: "#2196F3",
              "&:hover": {
                borderColor: "#1976D2",
                backgroundColor: "transparent",
                color: "#1976D2",
                transform: "scale(1.05)",
              },
              transition: "transform 0.3s ease",
              mt: 2,
            }}
          >
            Open in Google Maps
          </Button>
        </Box>
      )}

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
              transform: "scale(1.05)",
            },
            transition: "transform 0.3s ease",
          }}
        >
          Open in Google Maps
        </Button>
      </Box>
    </Box>
  );
};

export default Map;
