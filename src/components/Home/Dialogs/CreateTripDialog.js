import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { toast, toastOptions } from "../../../assets/hotToast";
import { useDispatch } from "react-redux";
import { createTrip, getUserTrips } from "../../../redux/actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../index.css";

const CreateTripDialog = ({ open, onClose }) => {
  const [tripName, setTripName] = useState("");
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startingPoint, setStartingPoint] = useState("");
  const [loading, setLoading] = useState(false);
  const [dateRangeStr, setDateRangeStr] = useState("");

  const dispatch = useDispatch();

  const handleClose = () => {
    setTripName("");
    setDescription("");
    setDestination("");
    setStartDate("");
    setEndDate("");
    setStartingPoint("");
    onClose();
  };

  const handleCreate = async () => {
    if (!tripName || !destination || !dateRangeStr || !startingPoint) {
      toast.error("Please fill in all fields!", { ...toastOptions });
      return;
    }

    const [rawStart, rawEnd] = dateRangeStr
      .split("-")
      .map((part) => part.trim());

    if (!rawStart || !rawEnd) {
      toast.error("Please select both start and end dates!", {
        ...toastOptions,
      });
      return;
    }

    const parsedStart = new Date(rawStart);
    const parsedEnd = new Date(rawEnd);

    if (isNaN(parsedStart.getTime()) || isNaN(parsedEnd.getTime())) {
      toast.error("Please enter valid dates!", { ...toastOptions });
      return;
    }

    if (parsedEnd < parsedStart) {
      toast.error("End date cannot be before start date!", { ...toastOptions });
      return;
    }

    if (parsedStart < new Date()) {
      toast.error("Start date cannot be before today!", { ...toastOptions });
      return;
    }

    const tripData = {
      trip_name: tripName,
      trip_description: description,
      start_date: parsedStart.toISOString().split("T")[0],
      end_date: parsedEnd.toISOString().split("T")[0],
      destination,
      starting_location: startingPoint,
    };

    try {
      setLoading(true);
      await dispatch(createTrip(tripData));
      await dispatch(getUserTrips());
      setLoading(false);
      handleClose();
      toast.success("Trip created successfully!", { ...toastOptions });
    } catch (error) {
      setLoading(false);
      toast.error("Error creating trip. Please try again.", {
        ...toastOptions,
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth='sm'
      PaperProps={{
        sx: {
          backgroundColor: "#181C1F",
          padding: "20px",
        },
      }}
    >
      <DialogTitle sx={dialogTitleStyle}>Create New Trip</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "200px",
            }}
          >
            <CircularProgress />
            <Typography variant='h6' sx={{ color: "#CACACC", mt: 2 }}>
              Creating trip...
            </Typography>
          </Box>
        ) : (
          <>
            <div className='mb-4'>
              <input
                required
                className='appearance-none rounded-md relative block w-full px-4 py-3 placeholder-gray-500 text-gray-300 focus:outline-none focus:z-10 sm:text-sm'
                placeholder='Trip Name'
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                style={{ paddingLeft: "1rem", backgroundColor: "#0E1113" }}
              />
            </div>

            <div className='mb-4'>
              <input
                required
                className='appearance-none rounded-md relative block w-full px-4 py-3 placeholder-gray-500 text-gray-300 focus:outline-none focus:z-10 sm:text-sm'
                placeholder='Depart From'
                value={startingPoint}
                onChange={(e) => setStartingPoint(e.target.value)}
                style={{ paddingLeft: "1rem", backgroundColor: "#0E1113" }}
              />
            </div>

            <div className='mb-4'>
              <input
                required
                className='appearance-none rounded-md relative block w-full px-4 py-3 placeholder-gray-500 text-gray-300 focus:outline-none focus:z-10 sm:text-sm'
                placeholder='Destination'
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                style={{ paddingLeft: "1rem", backgroundColor: "#0E1113" }}
              />
            </div>

            <div className='mb-4'>
              <textarea
                required
                className='appearance-none rounded-md relative block w-full px-4 py-3 placeholder-gray-500 text-gray-300 focus:outline-none focus:z-10 sm:text-sm'
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  paddingLeft: "1rem",
                  backgroundColor: "#0E1113",
                  height: "480px",
                  resize: "none",
                }}
                maxLength={100}
              />
            </div>

            <div className='mb-4 relative'>
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={([start, end]) => {
                  setStartDate(start);
                  setEndDate(end);
                  if (start && end) {
                    const formatOptions = {
                      month: "numeric",
                      day: "numeric",
                      year: "numeric",
                    };
                    const rangeString = `${start.toLocaleDateString(
                      "en-US",
                      formatOptions
                    )} - ${end.toLocaleDateString("en-US", formatOptions)}`;
                    setDateRangeStr(rangeString);
                  }
                }}
                isClearable
                placeholderText='Select Travel Dates'
                className='w-full px-4 py-3 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:z-10 sm:text-sm'
                style={{ paddingLeft: "1rem", backgroundColor: "#0E1113", width: "100%" }}
                popperClassName='react-datepicker-dark'
                calendarClassName='border-0'
                dayClassName={() => "text-gray-200 hover:bg-gray-800"}
                weekDayClassName={() => "text-gray-400"}
                fixedHeight={true}
                customInput={
                  <input
                    className='w-full rounded-md'
                    value={dateRangeStr}
                    onChange={() => {}}
                    style={{ backgroundColor: "#0E1113", width: "100%" }}
                  />
                }
                renderCustomHeader={({
                  monthDate,
                  decreaseMonth,
                  increaseMonth,
                }) => (
                  <div className='flex items-center justify-between px-2 py-2 bg-black'>
                    <button
                      onClick={decreaseMonth}
                      className='p-1 rounded bg-transparent hover:bg-gray-900 text-gray-300'
                    >
                      {"<"}
                    </button>
                    <span className='text-gray-300'>
                      {monthDate.toLocaleString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <button
                      onClick={increaseMonth}
                      className='p-1 rounded bg-transparent hover:bg-gray-900 text-gray-300'
                    >
                      {">"}
                    </button>
                  </div>
                )}
              />
            </div>
          </>
        )}
      </DialogContent>
      <DialogActions sx={dialogActionsStyle}>
        {!loading && (
          <>
            <Button
              onClick={handleClose}
              sx={{
                color: "#ff1400",
                border: "1px solid #ff1400",
                "&:hover": {
                  backgroundColor: "transparent",
                  transform: "scale(1.05)",
                },
                transition: "transform 0.3s ease",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              sx={{
                color: "#ffffff",
                backgroundColor: "#6369ff",
                "&:hover": {
                  backgroundColor: "#6369ff",
                  transform: "scale(1.05)",
                },
                transition: "transform 0.3s ease",
              }}
            >
              Create
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CreateTripDialog;

const dialogTitleStyle = {
  color: "#ffffff",
  textAlign: "center",
  fontSize: "1.5rem",
  marginBottom: "10px",
};

const dialogActionsStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "16px",
};
