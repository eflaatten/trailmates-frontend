import React from "react";
import { Typography } from "@mui/material";

const Overview = ({ trip }) => (
  <div>
    <Typography variant='h4' sx={{ marginBottom: 3 }}>
      {trip.trip_name}
    </Typography>
    <Typography variant='body1' sx={{ marginBottom: 1 }}>
      <strong>Destination:</strong> {trip.destination}
    </Typography>
    <Typography variant='body1' sx={{ marginBottom: 1 }}>
      <strong>Start Date:</strong>{" "}
      {new Date(trip.start_date).toLocaleDateString()}
    </Typography>
    <Typography variant='body1' sx={{ marginBottom: 1 }}>
      <strong>End Date:</strong> {new Date(trip.end_date).toLocaleDateString()}
    </Typography>
    <Typography variant='body1' sx={{ marginBottom: 2 }}>
      <strong>Description:</strong> {trip.trip_description}
    </Typography>
  </div>
);

export default Overview;
