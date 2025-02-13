import React, { useState, useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import OverviewIcon from "../../assets/icons/TabIcons/info-circle-fill.svg";
import AISummaryIcon from "../../assets/icons/TabIcons/stars.svg";
import MapIcon from "../../assets/icons/TabIcons/map.svg";
import CommentsIcon from "../../assets/icons/TabIcons/chat-square-text-fill.svg";
import Overview from "./Tabs/Overview";
import AISummary from "./Tabs/Summary";
import MapTab from "./Tabs/Map";

const Tabs = ({ children, icons }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef([]);

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 2,
          position: "relative",
        }}
      >
        {children.map((tab, index) => (
          <Typography
            key={index}
            ref={(el) => (tabRefs.current[index] = el)}
            onClick={() => setActiveTab(index)}
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: 2,
              cursor: "pointer",
              paddingBottom: 1,
              position: "relative",
              backgroundColor: activeTab === index ? "#2C3338" : "inherit",
              borderRadius: "4px",
              padding: "8px",
              transition: '0.2s ease',
              "&:hover": {
                //backgroundColor: activeTab === index ? "#2C3338" : "#2C3338",
                transition: '0.2s ease',
                transform: "scale(1.02)",
              },
            }}
          >
            <img
              src={icons[index]}
              alt={`${tab.props.label} icon`}
              style={{ marginRight: 8 }}
            />
            {tab.props.label}
          </Typography>
        ))}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            height: "2px",
            backgroundColor: "blue",
            transition: "left 0.3s ease, width 0.3s ease",
          }}
        />
      </Box>
      <Box>{children[activeTab]}</Box>
    </Box>
  );
};

const TripTabs = ({ trip, renderLink }) => {
  return (
    <Tabs icons={[OverviewIcon, AISummaryIcon, MapIcon, CommentsIcon]}>
      <Box label='Overview'>
        <Overview trip={trip} />
      </Box>
      <Box label='AI Summary'>
        <AISummary trip={trip} renderLink={renderLink} />
      </Box>
      <Box label='Map'>
        <MapTab selectedTripId={trip.tripId} />
      </Box>
    </Tabs>
  );
};

export default TripTabs;
