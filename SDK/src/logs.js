import axios from "axios";

const originalLogger = console.log;
let id = "default";

function sendToFastLog(level, ...args) {
  const body = JSON.stringify({
    ...args,
    id,
    level,
    timestamp: new Date().toISOString(),
  });
  axios("https://fastlog-production.up.railway.app/logs/add", {
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
}) => {
  if(!app_id) throw new Error("App ID is required");
  id = app_id;
  console.log = fastLogger("INFO");
  console.error = fastLogger("ERROR");
  console.warn = fastLogger("WARN");
  console.info = fastLogger("INFO");
  console.debug = fastLogger("DEBUG");
  console.trace = fastLogger("TRACE");
}

