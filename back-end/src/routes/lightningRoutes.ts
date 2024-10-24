// routes/userRoutes.ts
import express from "express";
import { rateLimiter, verifyJwt } from "../lib/middlewares";
import {
  checkIfUserPaid,
  checkInvoice,
  getInvoice,
} from "../controllers/lightningController";

const lightningRouter = express.Router();

lightningRouter.get("/getInvoice", verifyJwt, getInvoice);
lightningRouter.get("/checkInvoice", verifyJwt, checkInvoice);
lightningRouter.get("/checkIfUserPaid", verifyJwt, checkIfUserPaid);

export default lightningRouter;
