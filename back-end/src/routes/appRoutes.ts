// routes/userRoutes.ts
import express from "express";
import { createApp, deleteApp, editApp, getApp, getApps, heartbeat, setWebhook } from "../controllers/appController";
import { rateLimiter, verifyJwt } from "../lib/middlewares";

const appRouter = express.Router();

appRouter.post("/heartbeat", rateLimiter, heartbeat)
appRouter.post("/create", verifyJwt, rateLimiter, createApp);
appRouter.post("/delete", verifyJwt, rateLimiter, deleteApp)
appRouter.post("/edit", verifyJwt, rateLimiter, editApp)
appRouter.get("/:id", verifyJwt, rateLimiter, getApp)
appRouter.post("/set-webhook", verifyJwt, rateLimiter, setWebhook)
appRouter.get("/", verifyJwt, rateLimiter, getApps);

export default appRouter;
