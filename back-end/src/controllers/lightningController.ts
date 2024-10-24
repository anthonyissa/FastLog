import { Request, Response } from "express";
import {
  checkUserInvoice,
  didUserPay,
  getUserInvoice,
  makeUserInvoice,
} from "../services/lightning/lightningServices";

export const getInvoice = async (req: Request, res: Response) => {
  try {
    const userId = req["userId"];
    const invoice = await getUserInvoice(userId);
    res.status(200).send(invoice);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const checkInvoice = async (req: Request, res: Response) => {
  try {
    const hash = req.query.hash as string;
    const invoice = await checkUserInvoice(hash);
    res.status(200).send(invoice);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const checkIfUserPaid = async (req: Request, res: Response) => {
  try {
    const userId = req["userId"];
    const paid = await didUserPay(userId);
    res.status(200).send({ paid });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
