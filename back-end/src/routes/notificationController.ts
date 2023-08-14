// routes/userRoutes.ts
import express from "express";
import { rateLimiter, verifyJwt } from "../lib/middlewares";
import { createWebhook, deleteWebhook, getWebhooks, testNotification, updateWebhook } from "../controllers/notificationController";

const notificationRouter = express.Router();

notificationRouter.post("/test", verifyJwt, rateLimiter, testNotification);
notificationRouter.get("/webhooks", verifyJwt, rateLimiter, getWebhooks);
notificationRouter.post("/create-webhook", verifyJwt, rateLimiter, createWebhook);
notificationRouter.delete("/delete-webhook", verifyJwt, rateLimiter, deleteWebhook);
notificationRouter.post("/edit-webhook", verifyJwt, rateLimiter, updateWebhook);

export default notificationRouter;
