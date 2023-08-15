import axios from "axios";
import { originalLogger } from "./logs.js";
import { apiUrl } from "./utils.js";

export const heartbeat = (id, userId) => {
    axios(apiUrl + "/apps/heartbeat", {
      method: "POST",
      data: {
        id,
        userId,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      originalLogger("Error sending heartbeat update to fastlog", err);
    });
  setTimeout(() => {
    heartbeat(id, userId);
  }, 1000 * 60 * 1);
};
