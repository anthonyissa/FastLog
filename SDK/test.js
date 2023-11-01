import "./index.js";
import { monitor } from "./index.js";
import { activateFastLog } from "./src/logs.js";
activateFastLog({
  app_id: "baeefe7b-e41a-4a64-a655-376dd7d5002e",
  user_id: "431edb30-e4c5-42bf-8a09-741292c3085a",
});

setInterval(() => {}, 1000);
// console.log({ test: "test"}, "hello", "nice")
// monitor({
//     title: "Hello",
//     message: "World",
//     notify: true,
// })
