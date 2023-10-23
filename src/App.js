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
      <AppBar
        position="static"
        sx={{
          borderRadius: 2,
          border: 1,
        }}
      >
        <Toolbar
          sx={{
            borderRadius: 2,
            borderColor: "white",
            border: 1,
          }}
        >
          <Typography
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
            variant="h6"
          >
            AAI-520 NLP Final Project Chatbot{" "}
          </Typography>
        </Toolbar>
      </AppBar>
      <ChatBot />
    </Container>
  );
}

export default App;
