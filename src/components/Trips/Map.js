import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { getUserTrips, fetchPOIs } from "../../redux/actions";
import axios from "axios";

const Map = ({ selectedTripId }) => {
  const dispatch = useDispatch();
  const trips = useSelector((state) => state.trips.trips);
  const pois = useSelector((state) => state.trips.pois);

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

  const getWaypointsAlongRoute = (route) => {
    const points = route.routes[0].overview_path;
    const waypointInterval = Math.ceil(points.length / 5); // Adjust to get 5 waypoints
    return points.filter((_, index) => index % waypointInterval === 0);
  };

  // Reset state when a new trip is selected
  useEffect(() => {
    setDirectionsResponse(null);
    setStartCoords(null);
    setDestCoords(null);
  }, [selectedTripId]);

  useEffect(() => {
    if (trips.length > 0 && selectedTripId) {
      const selectedTrip = trips.find((trip) => trip.tripId === selectedTripId); // Fix here
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

                  // Get waypoints along the route
                  const waypoints = getWaypointsAlongRoute(result);
                  const waypointCoords = waypoints.map((point) => ({
                    lat: point.lat(),
                    lng: point.lng(),
                  }));

                  // Fetch POIs along the waypoints
                  dispatch(fetchPOIs(waypointCoords));
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

  return (
    <div>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "900px" }}
        center={startCoords || defaultCenter}
        zoom={10}
      >
        {/* Render the route using DirectionsRenderer */}
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}

        {/* Render POIs */}
        {pois && pois.length > 0
          ? pois.map((poi, index) => (
              <Marker
                key={index}
                position={{
                  lat: poi.geometry.location.lat,
                  lng: poi.geometry.location.lng,
                }}
              />
            ))
          : console.log("No POIs to render")}
      </GoogleMap>
    </div>
  );
};

export default Map;
