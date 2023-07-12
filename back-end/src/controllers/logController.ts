import { Request, Response } from "express";
import { addLogToSupabase, getLogsFromSupabase } from "../services/logServices";
import { MissingRequiredFieldsError } from "../model/error";

export const addLog = async (req: Request, res: Response) => {
  try {
    const { timestamp, level, app, message, user } = req.body; // USER WILL BE REPLACED WITH AUTH
    if (!timestamp || !level || !app || !message) throw new MissingRequiredFieldsError();
    await addLogToSupabase({
      timestamp,
      level,
      app,
      user,
      message: JSON.stringify(message),
    });
    res.json(true);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const getLogs = async (req: Request, res: Response) => {
  try {
    const { user, app } = req.query;
    if (!user || !app) throw new MissingRequiredFieldsError();

    const logs = await getLogsFromSupabase(user as string, app as string);
    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};