import React, { useEffect, useState } from "react";
import NavBar from "../Navigation/NavBar";
import TripList from "../Home/TripList";
import "./index.css";
import { getProfile } from "../../api/profile";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
                 
const Index = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const profile = await getProfile();
        setUsername(profile.username);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    }
    fetchUsername();
  }, []);

  return (
    <div>
      <NavBar />
      <Typography
        variant='h5'
        className='welcome-text'
        sx={{
          ml: 8,
          mt: 5,
          color: "#d6d6d6",
          "@media (max-width: 600px)": {
            ml: 1,
            mt: 3,
          },
        }}
      >
        Welcome back, {username}
      </Typography>
      <div className='trip-container'>
        <div className='trip-list-full-width'>
          <TripList />
        </div>
      </div>
    </div>
  );
};

export default Index;
