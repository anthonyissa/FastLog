// routes/userRoutes.ts
import express from "express";
import {
  createApp,
  deleteApp,
  editApp,
  getApp,
  getApps,
  setStatus,
  setWebhook,
} from "../controllers/appController";
import { verifyJwt } from "../lib/middlewares";

const appRouter = express.Router();

appRouter.post("/create", verifyJwt, createApp);
appRouter.post("/delete", verifyJwt, deleteApp);
appRouter.post("/edit", verifyJwt, editApp);
appRouter.get("/:id", verifyJwt, getApp);
appRouter.post("/set-webhook", verifyJwt, setWebhook);
appRouter.post("/status", setStatus);
appRouter.get("/", verifyJwt, getApps);

export default appRouter;
