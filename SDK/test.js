import "./index.js";
import { monitor } from "./index.js";
import { activateFastLog } from "./src/logs.js";

activateFastLog({
  api_url: "...",
  app_id,
  user_id,
  runHealthCheck: true,
});

// setInterval(() => {}, 1000);
console.log({ test: "test" }, "hello", "nice");
// monitor({
//   title: "Hello",
//   message: "World",
//   notify: true,
// });
// setTimeout(() => {
// throw new Error("Test");
// }, 10000);
