import axios from "axios";
import { apiUrl } from "./utils.js";
import { heartbeat } from "./heartbeat.js";

export const originalLogger = console.log;
export let id = undefined;
export let userId = undefined;

function sendToFastLog(level, ...args) {
  const body = JSON.stringify({
    ...args,
    id,
    level,
    userId,
    timestamp: new Date().toISOString(),
  });
  axios(apiUrl+"/logs/add", {
    method: "POST",
    data: body,
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => {
    originalLogger("Error sending log to fastlog", err);
  });
}


function fastLogger(level) {
  return function (...args) {
    originalLogger.apply(console, arguments);
    sendToFastLog(level, ...args);
  };
}

export const activateFastLog = ({
  app_id,
  user_id,
  activateHeartbeat = false,
}) => {
  if(!app_id) throw new Error("App ID is required");
  if(!user_id) throw new Error("User ID is required");
  userId = user_id;
  id = app_id;
  if (activateHeartbeat) heartbeat(id, userId);
  console.log = fastLogger("INFO");
  console.error = fastLogger("ERROR");
  console.warn = fastLogger("WARN");
  console.info = fastLogger("INFO");
  console.debug = fastLogger("DEBUG");
  console.trace = fastLogger("TRACE");
}

