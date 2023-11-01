import { apiUrl } from "./utils.js";
import { WebSocket } from "ws";

let retrying = false;

export const activateHealthCheck = ({ app_id, user_id }) => {
  const socket = new WebSocket(`${apiUrl.replace("https", "wss")}`);

  socket.onopen = () => {
    socket.send(JSON.stringify({ app_id, user_id }));
  };

  socket.onclose = () => {
    console.error(
      "Fastlog healthcheck failed, please check your internet connection or try again later."
    );
    retry({ app_id, user_id });
  };

  socket.onmessage = (event) => {
    console.error(event.data);
  };

  socket.onerror = (error) => {
    retry({ app_id, user_id });
  };
};

const retry = ({ app_id, user_id }) => {
  if (retrying) return;
  retrying = true;
  console.log("Trying to reconnect to Fastlog...");
  setTimeout(() => {
    activateHealthCheck({ app_id, user_id });
    retrying = false;
  }, 10000);
};
