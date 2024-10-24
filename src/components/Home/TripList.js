import React, { useEffect, useState } from "react";
import { Button, Divider, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserTrips } from "../../redux/actions";
import CreateTripDialog from "../Home/CreateTripDialog";
import TripItem from "../Home/TripItem";

const TripList = () => {
  const [openCreateTripDialog, setOpenCreateTripDialog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch trips from state
  const { trips = [], error } = useSelector((state) => state.trips);

  useEffect(() => {
    dispatch(getUserTrips());
  }, [dispatch]);

  const handleOpenCreateTripDialog = () => {
    setOpenCreateTripDialog(true);
  };

  const handleCloseCreateTripDialog = () => {
    setOpenCreateTripDialog(false);
  };

  const handleTripClick = (id) => {
    if (id) {
      navigate(`/trip/${id}`);
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 4,
        "@media (max-width: 600px)": {
          padding: 1,
          paddingTop: "40px",
          borderRadius: 4,
        },
      }}
    >
      {/* Create Trip Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <Button
          variant='contained'
          sx={{
            backgroundColor: "#2196F3",
            color: "white",
            "&:hover": {
              backgroundColor: "#1976D2",
              opacity: 0.9,
              transform: "scale(1.05)",
            },
            transition: "transform 0.3s ease",
            marginBottom: 2,
          }}
          onClick={handleOpenCreateTripDialog}
        >
          Create Trip
        </Button>
      </Box>

      <Divider
        sx={{
          backgroundColor: "#666",
          width: "100%",
          height: "1px",
          marginBottom: 2,
        }}
      />

      {/* Trip List Container */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#1a1a1a",
          borderRadius: 2,
          padding: 4,
          //minHeight: "200px",
          overflowY: "auto",
          overflowX: "hidden",
          //maxHeight: "500px",
          height: "auto",
          boxSizing: "border-box",
          marginTop: 2,
          "@media (max-width: 600px)": {
            marginTop: 2,
            padding: "10px",
            height: "auto",
            borderRadius: 4,
          },
        }}
      >
        {/* Labels */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr auto",
            gap: 2,
            color: "#aaa",
            paddingBottom: 2,
            "@media (max-width: 600px)": {
              gridTemplateColumns: "1fr 1fr auto", // Adjust for mobile: name, destination, actions
            },
          }}
        >
          <Typography variant='body2' sx={{ fontWeight: "bold" }}>
            Name
          </Typography>
          <Typography variant='body2' sx={{ fontWeight: "bold" }}>
            Destination
          </Typography>
          <Typography
            variant='body2'
            sx={{ fontWeight: "bold", display: { xs: "none", sm: "block" } }} // Hide Start Date on mobile
          >
            Start Date
          </Typography>
          <Typography
            variant='body2'
            sx={{ fontWeight: "bold", display: { xs: "none", sm: "block" } }} // Hide End Date on mobile
          >
            End Date
          </Typography>
          <Typography variant='body2' sx={{ fontWeight: "bold" }}>
            Actions
          </Typography>
        </Box>

        <Divider
          sx={{
            backgroundColor: "#666",
            width: "100%",
            height: "1px",
            marginBottom: 2,
          }}
        />

        {/* Trip Items */}
        {error ? (
          <Typography sx={{ color: "red" }}>{error}</Typography>
        ) : trips.length > 0 ? (
          trips.map((trip) => (
            <Box
              key={trip.tripId}
              onClick={() => handleTripClick(trip.tripId)}
              sx={{
                cursor: "pointer",
                "@media (max-width: 600px)": {
                  gap: "10px",
                  gridTemplateColumns: "1fr 1fr auto", // Match the labels on mobile
                },
                "&:hover": {
                  backgroundColor: "#444",
                },
              }}
            >
              <TripItem
                tripId={trip.tripId}
                tripName={trip.trip_name}
                destination={trip.destination}
                startDate={trip.start_date}
                endDate={trip.end_date}
                onDelete={() => dispatch(getUserTrips())}
              />
            </Box>
          ))
        ) : (
          <Typography
            variant='body1'
            sx={{ color: "#888", textAlign: "center" }}
          >
            No trips added so far.
          </Typography>
        )}
      </Box>

      <CreateTripDialog
        open={openCreateTripDialog}
        onClose={handleCloseCreateTripDialog}
      />
    </Box>
  );
};

export default TripList;
