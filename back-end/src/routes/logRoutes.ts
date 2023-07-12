// routes/userRoutes.ts
import express from "express";
import { addLog, getLogs } from "../controllers/logController";

const logRouter = express.Router();

logRouter.post("/create", addLog);
logRouter.get("/", getLogs);

export default logRouter;
