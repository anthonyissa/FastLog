import axios from "axios";
import { id, originalLogger, sendToFastLog, userId } from "./logs.js";
import { apiUrl } from "./utils.js";

export const activateHealthCheck = () => {
  setStatus("UP");

  process.on("uncaughtException", (error) => {
    originalLogger(error);
    sendToFastLog(
      "ERROR",
      JSON.stringify({
        name: error.name,
        error: error.message,
        stack: error.stack,
        code: error.code,
        reason: error.reason,
      })
    );
    setStatus("DOWN");
    setTimeout(() => {
      process.exit(1);
    }, 500);
  });

  process.on("unhandledRejection", (error) => {
    originalLogger(error);
    sendToFastLog(
      "ERROR",
      JSON.stringify({
        name: error.name,
        error: error.message,
        stack: error.stack,
        code: error.code,
        reason: error.reason,
      })
    );
    setStatus("DOWN");
    setTimeout(() => {
      process.exit(1);
    }, 500);
  });
};

export const setStatus = (status) => {
  axios(apiUrl + "/apps/status", {
    method: "POST",
    data: JSON.stringify({ user_id: userId, app_id: id, status }),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => {
    originalLogger("Error sending log to Fastlog", err);
  });
};
