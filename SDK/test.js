import './index.js';
import { activateFastLog } from './src/logs.js';
activateFastLog({ appName: "test" })
console.log({ test: "test"}, "hello", "nice")