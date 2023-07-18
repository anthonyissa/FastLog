// routes/userRoutes.ts
import express from "express";
import { createApp, deleteApp, editStatusThreshold, getApp, getApps } from "../controllers/appController";

const appRouter = express.Router();

appRouter.post("/create", createApp);
appRouter.post("/delete", deleteApp)
appRouter.post("/editStatusThreshold", editStatusThreshold)
appRouter.get("/:name", getApp)
appRouter.get("/", getApps);

export default appRouter;
