import { apiUrl } from "./utils.js";
import { WebSocket } from "ws";

let retrying = false;

export const activateHealthCheck = ({ app_id, user_id }) => {
  //   const socket = new WebSocket(`${apiUrl.replace("https", "wss")}`);
  const socket = new WebSocket(`ws://localhost:3000`);

  socket.onopen = () => {
    socket.send(JSON.stringify({ app_id, user_id }));
  };

  socket.onclose = () => {
    console.log(
      "Fastlog healthcheck failed, please check your internet connection or try again later."
    );
    retry({ app_id, user_id });
  };

  socket.onmessage = (event) => {
    console.log(event.data);
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
