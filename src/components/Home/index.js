import React from "react";
import NavBar from "../Navigation/NavBar";
import TripList from "../Home/TripList";
import "./index.css";
                 
const Index = () => {
  return (
    <div>
      <NavBar />
      <div className='trip-container'>
        <div 
        className='trip-list-full-width'
        style={{ marginLeft: "40px", padding: "20px" }}
        >
          <TripList />
        </div>
      </div>
    </div>
  );
};

export default Index;
