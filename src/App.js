// src/App.js
import React from "react";
import {
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import ChatBot from "./components/chatbot";

function App() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
            variant="h6"
          >
            AAI-520 ChatBot{" "}
          </Typography>
        </Toolbar>
      </AppBar>
      <ChatBot />
    </Container>
  );
}

export default App;
