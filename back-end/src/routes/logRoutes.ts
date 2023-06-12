// routes/userRoutes.ts
import express, { Request, Response } from "express";
import { addLog } from "../controllers/logController";

const logRouter = express.Router();

logRouter.post("/add", addLog);

export default logRouter;
