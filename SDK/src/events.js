import axios from "axios";
import { id, userId } from "./logs.js";
import { apiUrl } from "./utils.js";

export const monitor = ({
    title,
    message,
    notify = false,
}) => {
  const body = JSON.stringify({
    title,
    message,
    notify,
    userId: userId,
    id: id,
    timestamp: new Date().toISOString(),
  });
  axios(apiUrl+"/events/add", {
    method: "POST",
    data: body,
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => {
    originalLogger("Error sending event to fastlog", err);
  });
}