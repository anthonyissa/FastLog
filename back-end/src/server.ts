import express, { Request, Response } from "express";
import logRouter from "./routes/logRoutes";
import appRouter from "./routes/appRoutes";
import cors from "cors";
import { launchStatusWatcher } from "./lib/statusWatcher";
import { rateLimiter, verifyJwt } from "./lib/middlewares";
import dotenv from "dotenv";
import eventRouter from "./routes/eventRoutes";
import notificationRouter from "./routes/notificationController";
import { initWebsocket } from "./socket";
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({ origin: [process.env.FRONT_URL], credentials: true }));
// (async () => {
//   await launchStatusWatcher();
// })();

app.use("/logs", logRouter);
app.use("/events", eventRouter);
app.use("/apps", verifyJwt, rateLimiter, appRouter);
app.use("/notifications", verifyJwt, rateLimiter, notificationRouter);

app.get("/", verifyJwt, rateLimiter, (req: Request, res: Response) => {
  res.send("Hello from FastLog!");
});

const port = process.env.PORT || 3000;

const http = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const wsServer = initWebsocket(http);
