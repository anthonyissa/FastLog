import express, { Request, Response } from "express";
import logRouter from "./routes/logRoutes";
import appRouter from "./routes/appRoutes";
import cors from "cors";
import { launchStatusWatcher } from "./lib/statusWatcher";
import { rateLimiter, verifyJwt } from "./lib/middlewares";
import dotenv from "dotenv";
import eventRouter from "./routes/eventRoutes";
import notificationRouter from "./routes/notificationController";
dotenv.config();

const app = express();
const http = require("http").Server(app);

app.use(express.json());

app.use(cors({ origin: [process.env.FRONT_URL], credientials:true }));
(async () => {
  await launchStatusWatcher();
})();

app.use("/logs", logRouter);
app.use("/events", eventRouter)
app.use("/apps", verifyJwt, rateLimiter, appRouter);
app.use("/notifications", verifyJwt, rateLimiter, notificationRouter);

app.get("/", verifyJwt, rateLimiter, (req: Request, res: Response) => {
  res.send("Hello from FastLog!");
});

const port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
