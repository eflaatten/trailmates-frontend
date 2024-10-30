import React from "react";
import { Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";

const convertLinksToMarkdown = (text) => {
  const urlRegex = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g;
  return text.replace(urlRegex, (match, name, url) => `[${name}](${url})`);
};

const AISummary = ({ trip, renderLink }) => {
  const processedResponse = convertLinksToMarkdown(trip.openai_response);

  return (
    <Typography variant='body1' sx={{ marginBottom: 2 }}>
      <strong>AI Summary:</strong>
      <ReactMarkdown components={{ a: renderLink }}>
        {processedResponse}
      </ReactMarkdown>
    </Typography>
  );
};

export default AISummary;
