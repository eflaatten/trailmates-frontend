import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import { Button } from "@mui/material";
import { fetchRoute, getUserTrips } from "../../../redux/actions";
import { geocodeLocation } from "../../../api/map";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Default marker icon fix for Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Map = ({ selectedTripId }) => {
  const dispatch = useDispatch();
  const trips = useSelector((state) => state.trips.trips);
  const routePolyline = useSelector((state) => state.trips.routes || []);
  const [startCoords, setStartCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);

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
          const originCoords = await geocodeLocation(startLocation);
          const destinationCoords = await geocodeLocation(destination);

          if (originCoords && destinationCoords) {
            setStartCoords(originCoords);
            setDestCoords(destinationCoords);

            // Fetch route polyline between start and destination
            dispatch(fetchRoute(originCoords, destinationCoords));
          }
        };
        fetchMapData();
      }
    }
  }, [trips, selectedTripId, dispatch]);

  const RouteAutoCenter = ({ polyline }) => {
    const map = useMap();

    useEffect(() => {
      if (polyline && polyline.length > 0) {
        const bounds = L.latLngBounds(
          polyline.map((point) => [point.lat, point.lng])
        );
        map.fitBounds(bounds);
      }
    }, [polyline, map]);

    return null;
  };

  const openRouteInOSM = () => {
    if (routePolyline.length > 0) {
      const start = routePolyline[0];
      const end = routePolyline[routePolyline.length - 1];
      const osmUrl = `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${start.lat},${start.lng};${end.lat},${end.lng}`;
      window.open(osmUrl, "_blank");
    }
  }

  return (
    <>
      <Button
        onClick={openRouteInOSM}
        sx={{
          transition: "0.2s",
          backgroundColor: "#0b82e3",
          color: "#fff",
          mb: 2,
          "&:hover": {
            backgroundColor: "#00659c",
            color: "white",
            cursor: "pointer",
            transform: "scale(1.03)",
            transition: "0.2s",
          },
        }}
      >
        Open route
      </Button>
      <MapContainer
        center={[37.7749, -122.4194]} // Default center, will be overridden by `fitBounds`
        zoom={10}
        style={{ width: "100%", height: "900px" }}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />

        {startCoords && (
          <Marker position={startCoords}>
            <Popup>Starting Point</Popup>
          </Marker>
        )}

        {destCoords && (
          <Marker position={destCoords}>
            <Popup>Destination</Popup>
          </Marker>
        )}

        {/* Polyline for the route */}
        {Array.isArray(routePolyline) && routePolyline.length > 0 && (
          <>
            <Polyline
              positions={routePolyline.map((point) => [point.lat, point.lng])}
              color='blue'
            />
            <RouteAutoCenter polyline={routePolyline} />
          </>
        )}
      </MapContainer>
    </>
  );
};

export default Map;
