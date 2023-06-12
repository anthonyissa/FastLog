// routes/userRoutes.ts
import express, { Request, Response } from "express";
import { addLog, getLogs } from "../controllers/logController";

const logRouter = express.Router();

logRouter.post("/add", addLog);
logRouter.get("/", getLogs);

export default logRouter;
