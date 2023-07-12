// routes/userRoutes.ts
import express from "express";
import { createApp, getApps } from "../controllers/appController";

const appRouter = express.Router();

appRouter.post("/create", createApp);
appRouter.get("/", getApps);

export default appRouter;
