import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
        {children.map((tab, index) => (
          <Typography
            key={index}
            onClick={() => setActiveTab(index)}
            sx={{
              marginRight: 2,
              cursor: "pointer",
              color: activeTab === index ? "#1971ff" : "inherit",
              borderBottom: activeTab === index ? "2px solid blue" : "none",
              paddingBottom: 1,
            }}
          >
            {tab.props.label}
          </Typography>
        ))}
      </Box>
      <Box>{children[activeTab]}</Box>
    </Box>
  );
};

export default Tabs;

