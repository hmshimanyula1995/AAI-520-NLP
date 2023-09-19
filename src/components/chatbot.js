import React, { useState, useEffect } from "react";
import Message from "./message";
import {
  TextField,
  IconButton,
  CircularProgress,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";

// Define a dark theme
const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#15151a",
    },
  },
});

const dummyData = [
  {
    query: "hello",
    response: "Hello, how can I assist you today?",
  },
  {
    query: "who are you",
    response: "I am a ChatBot here to assist you.",
  },
];

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const mockApiFetch = (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const response =
          dummyData.find((data) => data.query === query.toLowerCase())
            ?.response || "I don't know.";
        resolve(response);
      }, 1000);
    });
  };

  const sendMessage = async () => {
    setLoading(true);
    setMessages([...messages, { isUser: true, text: input }]);
    const botResponse = await mockApiFetch(input);
    setLoading(false);
    setMessages([
      ...messages,
      { isUser: true, text: input },
      { isUser: false, text: botResponse },
    ]);
    setInput("");
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div
        style={{
          padding: "20px",
          background: "#15151a",
        }}
      >
        <div
          style={{
            height: "400px",
            overflowY: "scroll",
            backgroundColor: "#15151a",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          {messages.map((message, index) => (
            <Message key={index} isUser={message.isUser} text={message.text} />
          ))}
          {loading && (
            <div style={{ textAlign: "center" }}>
              <CircularProgress />
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            value={input}
            onChange={handleInput}
            disabled={loading}
            style={{ backgroundColor: "#252525" }}
            InputProps={{
              style: { color: "white" },
            }}
          />
          <IconButton color="primary" onClick={sendMessage} disabled={loading}>
            <SendIcon />
          </IconButton>
          <IconButton color="secondary" onClick={clearChat} disabled={loading}>
            <ClearIcon Clear ChatBot />
          </IconButton>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ChatBot;
