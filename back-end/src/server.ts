import express, { Request, Response } from "express";
import logRouter from "./routes/logRoutes";
import appRouter from "./routes/appRoutes";
import cors from "cors";
import { launchStatusWatcher } from "./lib/statusWatcher";
import { rateLimiter, verifyJwt } from "./lib/middlewares";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
console.log(process.env.FRONT_URL)
app.use(cors({ origin: [process.env.FRONT_URL], credientials:true }));
(async () => {
  await launchStatusWatcher();
})();

app.use("/logs", logRouter);
app.use("/apps", verifyJwt, rateLimiter, appRouter);

app.get("/", verifyJwt, rateLimiter, (req: Request, res: Response) => {
  res.send("Hello from FastLog!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
