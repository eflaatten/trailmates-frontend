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
import CommentsTab from './Tabs/Comments';
import TripTabs from "./TripTabs";

const TripDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Ensure trips is an array and safely find the trip by ID
  const trips = useSelector((state) => state.trips.trips || []);
  const trip = trips.find((trip) => trip.tripId === parseInt(id));

  // Handle back navigation
  const handleBack = () => {
    navigate("/");
  };

  // Custom link renderer for ReactMarkdown
  const renderLink = ({ href, children }) => (
    <MuiLink
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      underline='none'
    >
      <IconButton
      color='primary'
      sx={{
        padding: 0,
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
      >
        <LinkIcon />
        <Typography
          variant='body1'
          sx={{
            ml: 1,
            "&:hover": {
              textDecoration: "underline",
              backgroundColor: "transparent",
            },
          }}
        >
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
            color: "#CACACC",
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
                backgroundColor: "#181C1F",
                padding: 3,
                borderRadius: 2,
                boxShadow: 3,
                marginBottom: 4,
              }}
            >
              <TripTabs trip={trip} renderLink={renderLink} />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default TripDetails;
