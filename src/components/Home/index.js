import React from "react";
import NavBar from "../Navigation/NavBar";
import TripList from "../Home/TripList";
import TripDetails from "../Home/TripDetails";
import "./index.css";
import Split from "react-split";

const Index = () => {

  return (
    <div>
      <NavBar />
      <Split
        sizes={[50, 50]}
        minSize={100} 
        expandToMin={false}
        gutterSize={5} 
        gutterAlign='center'
        snapOffset={0}
        dragInterval={1}
        direction='horizontal' 
        className='split-container'
      >
        <div className='left-panel'>
          <TripList />
        </div>
        <div className='right-panel'>
          <TripDetails />
        </div>
      </Split>
    </div>
  );
};

export default Index;
