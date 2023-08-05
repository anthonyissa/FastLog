// routes/userRoutes.ts
import express from "express";
import { addLog, getLogs } from "../controllers/logController";
import { verifyJwt } from "../lib/jwt";

const logRouter = express.Router();

logRouter.post("/add", addLog);
logRouter.get("/", verifyJwt, getLogs);

export default logRouter;
