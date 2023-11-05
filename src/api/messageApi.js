import axios from "axios";

const API_ENDPOINT =
  "http://nlp-bot-1063111525.us-east-1.elb.amazonaws.com:80/predict";

export const getChatBotResponse = async (userMessage, conversationHistory) => {
  try {
    const response = await axios.post(
      API_ENDPOINT,
      {
        user_input: userMessage,
        conversation_history: conversationHistory,
      },
      {
        timeout: 5000,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "An error occurred while fetching the chatbot response:",
      error?.response?.data || error.message
    );
    throw error;
  }
};
