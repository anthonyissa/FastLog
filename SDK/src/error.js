import { originalLogger, sendToFastLog } from "./logs.js";

process.on("uncaughtException", (error) => {
  originalLogger(error);
  sendToFastLog(
    "ERROR",
    JSON.stringify({
      name: error.name,
      error: error.message,
      stack: error.stack,
    })
  );
});

process.on("unhandledRejection", (error) => {
  originalLogger(error);
  sendToFastLog(
    "ERROR",
    JSON.stringify({
      name: error.name,
      error: error.message,
      stack: error.stack,
    })
  );
});
