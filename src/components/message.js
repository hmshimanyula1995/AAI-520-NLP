import React from "react";
import { Typography, Paper } from "@mui/material";

const Message = ({ isUser, text }) => {
  return (
    <div style={{ textAlign: isUser ? "right" : "left", margin: "10px 0" }}>
      <Paper
        style={{
          display: "inline-block",
          padding: "10px",
          backgroundColor: isUser ? "#90caf9" : "#f48fb1",
          color: "#15151a",
          borderRadius: "10px",
        }}
      >
        <Typography variant="body1">{text}</Typography>
      </Paper>
    </div>
  );
};

export default Message;
