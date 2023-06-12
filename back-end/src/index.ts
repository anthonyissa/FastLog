import express, { Request, Response } from "express";
import logRouter from "./routes/logRoutes";

const app = express();
app.use(express.json());
const port = 3000;

app.use("/logs", logRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
