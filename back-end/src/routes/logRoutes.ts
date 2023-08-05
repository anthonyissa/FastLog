// routes/userRoutes.ts
import express from "express";
import { addLog, getLogs } from "../controllers/logController";
import { rateLimiter, verifyJwt } from "../lib/middlewares";

const logRouter = express.Router();

logRouter.post("/add", addLog);
logRouter.get("/", verifyJwt, rateLimiter, getLogs);

export default logRouter;
