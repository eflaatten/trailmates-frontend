import React from "react";
import { Box, Typography, IconButton, Link as MuiLink } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LinkIcon from "@mui/icons-material/Link"; 
import NavBar from "../Navigation/NavBar";
import ReactMarkdown from "react-markdown";
import Map from "./Map"; 

const TripDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Ensure trips is an array and safely find the trip by ID
  const trips = useSelector((state) => state.trips.trips || []);
  const trip = trips.find((trip) => trip.tripId === parseInt(id));

  // Handle back navigation
  const handleBack = () => {
    navigate("/home");
  };

  // Custom link renderer for ReactMarkdown
  const renderLink = ({ href, children }) => (
    <MuiLink
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      underline='none'
    >
      <IconButton color='primary'>
        <LinkIcon />
        <Typography variant='body1' sx={{ ml: 1 }}>{children}</Typography>
      </IconButton>
    </MuiLink>
  );

  return (
    <Box sx={{ minHeight: "100vh", color: "#fff" }}>
      <NavBar />
      <Box
        sx={{
          padding: 4,
          margin: "20px",
          "@media (max-width: 600px)": {
            padding: 2,
            margin: "0",
          },
        }}
      >
        {/* Back Arrow */}
        <IconButton
          onClick={handleBack}
          sx={{
            color: "#fff",
            padding: 0,
            marginBottom: 3,
            transition: "transform 0.2s",
            "&:hover": {
              transform: "translateX(-5px)",
            },
            "@media (max-width: 600px)": {
              marginTop: 2,
            },
          }}
        >
          <ArrowBackIosNewIcon />
          Go Back
        </IconButton>

        {/* Trip Information or Trip Not Found */}
        {!trip ? (
          <Typography
            variant='h4'
            sx={{ marginBottom: 3, textAlign: "center" }}
          >
            Trip not found
          </Typography>
        ) : (
          <>
            <Typography variant='h4' sx={{ marginBottom: 3 }}>
              {trip.trip_name}
            </Typography>

            <Box
              sx={{
                backgroundColor: "#1a1a1a",
                padding: 3,
                borderRadius: 2,
                boxShadow: 3,
                marginBottom: 4,
              }}
            >
              <Typography variant='body1' sx={{ marginBottom: 1 }}>
                <strong>Destination:</strong> {trip.destination}
              </Typography>
              <Typography variant='body1' sx={{ marginBottom: 1 }}>
                <strong>Start Date:</strong>{" "}
                {new Date(trip.start_date).toLocaleDateString()}
              </Typography>
              <Typography variant='body1' sx={{ marginBottom: 1 }}>
                <strong>End Date:</strong>{" "}
                {new Date(trip.end_date).toLocaleDateString()}
              </Typography>
              <Typography variant='body1' sx={{ marginBottom: 2 }}>
                <strong>Description:</strong> {trip.trip_description}
              </Typography>
              <Typography variant='body1' sx={{ marginBottom: 2 }}>
                <strong>AI Summary:</strong>
                <ReactMarkdown
                  components={{
                    a: renderLink, // Use custom link renderer for markdown links
                  }}
                >
                  {trip.openai_response}
                </ReactMarkdown>
              </Typography>

              {/* Map */}
              <Box
                sx={{
                  marginTop: 4,
                  borderRadius: 4,
                  "@media (max-width: 600px)": {
                    marginTop: 6,
                    width: "110%",
                    marginLeft: "-4.8%",
                  },
                }}
              >
                <Map selectedTripId={trip.tripId} />
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default TripDetails;
