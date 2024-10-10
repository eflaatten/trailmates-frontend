import React from "react";
import NavBar from "../Navigation/NavBar";
import TripList from "../Home/TripList";
import TripDetails from "../Home/TripDetails";
import "./index.css";

// index is the home page holding both the TripList and TripDetails components
const Index = () => {
  return (
    <div>
      <NavBar />
      <div className='trip-container'>
        <div className='trip-list'>
          <TripList />
        </div>
        <div className='divider' /> 
        <div className='trip-details'>
          <TripDetails />
        </div>
      </div>
    </div>
  );
};

export default Index;
