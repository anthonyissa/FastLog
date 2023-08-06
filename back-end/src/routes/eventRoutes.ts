// routes/userRoutes.ts
import express from "express";
import { rateLimiter, verifyJwt } from "../lib/middlewares";
import { addEvent, getEvents } from "../controllers/eventController";

const eventRouter = express.Router();

eventRouter.post("/add", addEvent);
eventRouter.get("/", verifyJwt, rateLimiter, getEvents);

export default eventRouter;
