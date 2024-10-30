import React from "react";
import { Box, Typography, IconButton, Link as MuiLink } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LinkIcon from "@mui/icons-material/Link";
import NavBar from "../Navigation/NavBar";
import Tabs from "./TripTabs";
import Overview from "./Tabs/Overview";
import AISummary from "./Tabs/Summary";
import MapTab from "./Tabs/Map";

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
        <Typography variant='body1' sx={{ ml: 1 }}>
          {children}
        </Typography>
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
            <Box
              sx={{
                backgroundColor: "#1a1a1a",
                padding: 3,
                borderRadius: 2,
                boxShadow: 3,
                marginBottom: 4,
              }}
            >
              <Tabs>
                <div label='Overview'>
                  <Overview trip={trip} />
                </div>
                <div label='AI Summary'>
                  <AISummary trip={trip} renderLink={renderLink} />
                </div>
                <div label='Map'>
                  <MapTab selectedTripId={trip.tripId} />
                </div>
              </Tabs>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default TripDetails;
