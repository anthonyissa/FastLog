import axios from "axios";

const originalLogger = console.log;
let app = "default";

function sendToFastLog(level, ...args) {
  const body = JSON.stringify({
    ...args,
    app,
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
  appName,
}) => {
  app = appName;
  console.log = fastLogger("INFO");
  console.error = fastLogger("ERROR");
  console.warn = fastLogger("WARN");
  console.info = fastLogger("INFO");
  console.debug = fastLogger("DEBUG");
  console.trace = fastLogger("TRACE");
}

