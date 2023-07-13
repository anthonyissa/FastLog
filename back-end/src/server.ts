import express, { Request, Response } from "express";
import logRouter from "./routes/logRoutes";
import appRouter from "./routes/appRoutes";
import cors from "cors";
import { launchStatusWatcher } from "./lib/statusWatcher";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
(async () => {
  await launchStatusWatcher();
})();

app.use("/logs", logRouter);
app.use("/apps", appRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from FastLog!");
});

const port = process.env.PORT || 3000;

app.listen(port , () => {
  console.log(`Server is running on port ${port}`);
});