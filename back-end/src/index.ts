import express, { Request, Response } from "express";
import logRouter from "./routes/logRoutes";
import appRouter from "./routes/appRoutes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
const port = 3000;

app.use("/logs", logRouter);
app.use("/apps", appRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
