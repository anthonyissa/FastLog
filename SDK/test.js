import './index.js';
import { monitor } from './index.js';
import { activateFastLog } from './src/logs.js';
activateFastLog({
  });
console.log({ test: "test"}, "hello", "nice")
monitor({
    title: "Hello",
    message: "World",
    notify: true,
})