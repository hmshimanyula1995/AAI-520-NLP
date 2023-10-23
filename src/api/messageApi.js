import axios from "axios";

export const getChatBotResponse = (userMessage, conversationHistory) => {
  return axios
    .post(
      "http://nlp-balancer-1986643678.us-east-1.elb.amazonaws.com:80/predict",
      {
        user_input: userMessage,
        conversation_history: conversationHistory,
      }
    )
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
