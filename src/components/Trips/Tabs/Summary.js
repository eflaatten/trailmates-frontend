import React from "react";
import { Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";

const AISummary = ({ trip, renderLink }) => (
  <Typography variant='body1' sx={{ marginBottom: 2 }}>
    <strong>AI Summary:</strong>
    <ReactMarkdown components={{ a: renderLink }}>
      {trip.openai_response}
    </ReactMarkdown>
  </Typography>
);

export default AISummary;
