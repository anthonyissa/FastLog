const { default: axios } = require("axios");

const originalLogger = console.log;

function fastLogger(message) {
  originalLogger.apply(console, arguments);
  sendToFastLog(message);
}

function sendToFastLog(message) {
  const body = JSON.stringify({
    message: message,
    level: "INFO",
    timestamp: new Date().toISOString(),
  });
  axios("http://localhost:3000/logs/add", {
    method: "POST",
    data: body,
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => {
    console.error(err);
  });
}
console.log = fastLogger;

module.exports = fastLogger;
