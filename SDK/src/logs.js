import axios from "axios";
import { apiUrl, setApiUrl } from "./utils.js";
import { activateHealthCheck } from "./error.js";

export const originalLogger = console.log;
export let id = undefined;
export let userId = undefined;

export function sendToFastLog(level, ...args) {
  const body = JSON.stringify({
    ...args,
    id,
    level,
    userId,
    timestamp: new Date().toISOString(),
  });
  axios(apiUrl + "/logs/add", {
    method: "POST",
    data: body,
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => {
    originalLogger("Error sending log to Fastlog", err);
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
  api_url,
  runHealthCheck = true,
}) => {
  if (api_url) setApiUrl(api_url);
  if (!app_id) throw new Error("App ID is required");
  if (!user_id) throw new Error("User ID is required");
  userId = user_id;
  id = app_id;
  if (runHealthCheck) activateHealthCheck({ app_id, user_id });
  console.log = fastLogger("INFO");
  console.error = fastLogger("ERROR");
  console.warn = fastLogger("WARN");
  console.info = fastLogger("INFO");
  console.debug = fastLogger("DEBUG");
  console.trace = fastLogger("TRACE");
};
