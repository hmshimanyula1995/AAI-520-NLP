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
import { getChatBotResponse } from "../api/messageApi";
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
      default: "white",
    },
  },
});

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async () => {
    setLoading(true);
    const userMessage = { isUser: true, text: input };
    setMessages([...messages, userMessage]);

    const conversationHistory = messages.map((message) => message.text);
    const botResponse = await getChatBotResponse(input, conversationHistory);

    setLoading(false);
    setMessages([
      ...messages,
      userMessage,
      { isUser: false, text: botResponse.response },
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
          borderRadius: 2,
          borderColor: "white",
          border: 10,
        }}
      >
        <div
          style={{
            height: "400px",
            overflowY: "scroll",
            backgroundColor: "#15151a",
            borderRadius: "10px",
            padding: "10px",
            borderColor: "white",
            border: 10,
          }}
        >
          {messages.map((message, index) => (
            <Message key={index} isUser={message.isUser} text={message.text} />
          ))}
          {loading && (
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  height: "400px",
                  overflowY: "scroll",
                  backgroundColor: "#15151a",
                  borderRadius: "10px",
                  padding: "10px",
                  borderColor: "white",
                  border: 10,
                  color: "white",
                }}
              >
                Bot is Typing...
              </span>
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
            borderRadius: 2,
            borderColor: "white",
            border: 1,
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
