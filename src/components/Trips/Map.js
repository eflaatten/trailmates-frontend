import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GoogleMap,
  DirectionsRenderer,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import {
  getUserTrips,
  fetchWaypoints,
  fetchPoisForWaypoints,
} from "../../redux/actions";
import { Button, Box } from "@mui/material";
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
                    .filter((_, index) => index % 40 === 0)
                    .map((point) => ({
                      lat: point.lat(),
                      lng: point.lng(),
                    }));

                  //dispatch(fetchWaypoints(filteredWaypoints));
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

  const mapOptions = {
    streetViewControl: false,
    mapTypeControl: true,
    fullscreenControl: false,
    zoomControl: true,
  };

  return (
    <Box>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "900px" }}
        center={startCoords || defaultCenter}
        zoom={10}
        options={mapOptions}
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
                onClick={() => {
                  setSelectedPoi(poi);
                }}
              />
            ))
          )}

        {/* Single InfoWindow */}
        {/*OVERLAPPING INFOWINDOWS ~ FIX LATER*/}
        {/* {selectedPoi && (
          <InfoWindow
            position={{
              lat: selectedPoi.geometry.location.lat,
              lng: selectedPoi.geometry.location.lng,
            }}
            onCloseClick={() => setSelectedPoi(null)}
            options={{ disableAutoPan: true }} // Prevents auto-pan on open
          >
            <div
              style={{
                width: "200px",
                cursor: "pointer",
                textAlign: "center",
                display: selectedPoi ? "block" : "none", // Ensures it's hidden if no POI
              }}
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${selectedPoi.geometry.location.lat},${selectedPoi.geometry.location.lng}`,
                  "_blank"
                )
              }
            >
              {selectedPoi.photos && selectedPoi.photos.length > 0 && (
                <img
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${selectedPoi.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
                  alt={selectedPoi.name}
                  style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                />
              )}
              <h3 style={{ color: "#000", margin: "8px 0 4px" }}>
                {selectedPoi.name}
              </h3>
              <p style={{ color: "#000", margin: "4px 0" }}>
                {selectedPoi.vicinity}
              </p>
            </div>
          </InfoWindow>
        )} */}
      </GoogleMap>

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
