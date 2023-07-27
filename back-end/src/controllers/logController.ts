import { Request, Response } from "express";
import { addLogToSupabase, getLogsFromSupabase } from "../services/logs/logServices";
import { MissingRequiredFieldsError } from "../model/error";

export const addLog = async (req: Request, res: Response) => {
  try {
    const { timestamp, level, id, user, ...args } = req.body;
    if (!timestamp || !level || !id) throw new MissingRequiredFieldsError();
    await addLogToSupabase({
      timestamp,
      level,
      id,
      user,
      ...args,
    });
    res.json(true);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const getLogs = async (req: Request, res: Response) => {
  try {
    const { user, id } = req.query;
    if (!user || !id) throw new MissingRequiredFieldsError();

    const logs = await getLogsFromSupabase(user as string, id as string);
    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
