import React, { useState } from "react";
import { Button, Divider, Box, Typography, Paper } from "@mui/material";
import CreateTripDialog from "../Home/CreateTripDialog";

const TripList = () => {
  const [openCreateTripDialog, setOpenCreateTripDialog] = useState(false);

  const handleOpenCreateTripDialog = () => {
    setOpenCreateTripDialog(true);
  };

  const handleCloseCreateTripDialog = () => {
    setOpenCreateTripDialog(false);
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#1a1a1a",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 4,
        "@media (max-width: 600px)": {
          padding: 2,
          borderRadius: 0,
        }
      }}
    >

      {/* Button to create a new trip */}
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
            },
            marginBottom: 2,
          }}
          onClick={handleOpenCreateTripDialog}
        >
          Create Trip
        </Button>
      </Box>

      {/* Divider between button and trip list */}
      <Divider
        sx={{
          backgroundColor: "#444",
          width: "100%",
          marginBottom: 2,
        }}
      />

      {/* Trip List Container */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "2100px",
          backgroundColor: "#2C2C2C", // Slightly lighter dark gray
          borderRadius: 2,
          padding: 2,
          minHeight: "200px",
          overflowY: "auto", // Allow overflow inside the box
          overflowX: "hidden", // Disable horizontal scrolling
          maxHeight: "500px", // Set a max height for scrolling behavior
          boxSizing: "border-box", // Ensure padding is included in width
          marginTop: 6,
          "@media (max-width: 600px)": {
            marginTop: 2,
          }
        }}
      >
        {/* No trips message */}
        <Typography variant='body1' sx={{ color: "#888", textAlign: "center" }}>
          No trips added so far.
        </Typography>
      </Box>

      {/* Create Trip Dialog */}
      <CreateTripDialog
        open={openCreateTripDialog}
        onClose={handleCloseCreateTripDialog}
      />
    </Box>
  );
};

export default TripList;
