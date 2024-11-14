import React from "react";
import { Box, Typography, Link } from "@mui/material";
import GithubIcon from '../src/assets/icons/github.svg';

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        backgroundColor: "transparent",
        color: "#004966",
        bottom: 0,
        width: "100%",
        maxWidth: "100vw", // Ensure it does not overflow
        boxSizing: "border-box", // Include padding in the element's total width and height
      }}
    >
      <div className='left-side-footer' style={{ display: "flex", gap: 18 }}>
        <Typography variant='body1'>2024</Typography>
        <Typography variant='body1'>TripMates</Typography>
        <Typography variant='body1'>Created by: Elliot Flaatten</Typography>
      </div>
      <Link
        href='https://github.com/eflaatten'
        target='_blank'
        rel='noopener'
        sx={{ color: "#004966", textDecoration: "none" }}
      >
        GitHub
      </Link>
    </Box>
  );
};

export default Footer;
