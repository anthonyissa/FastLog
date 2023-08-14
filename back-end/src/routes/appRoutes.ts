// routes/userRoutes.ts
import express from "express";
import { createApp, deleteApp, editApp, getApp, getApps, setWebhook } from "../controllers/appController";

const appRouter = express.Router();

appRouter.post("/create", createApp);
appRouter.post("/delete", deleteApp)
appRouter.post("/edit", editApp)
appRouter.get("/:id", getApp)
appRouter.post("/set-webhook", setWebhook)
appRouter.get("/", getApps);

export default appRouter;
