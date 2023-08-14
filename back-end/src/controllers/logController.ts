import { Request, Response } from "express";
import { addLogToSupabase, getLogsFromSupabase } from "../services/logs/logServices";
import { MissingRequiredFieldsError } from "../model/errors";

export const addLog = async (req: Request, res: Response) => {
  try {
    const { timestamp, level, userId, id, ...args } = req.body;
    if (!timestamp || !level || !id || !userId) throw new MissingRequiredFieldsError();
    await addLogToSupabase({
      timestamp,
      level,
      id,
      user: userId,
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
    const { id } = req.query;
    if (!id) throw new MissingRequiredFieldsError();

    const logs = await getLogsFromSupabase(req["userId"], id as string);
    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
