import { Request, Response } from "express";
import { addLogToSupabase, getLogsFromSupabase } from "../services/logServices";

export const addLog = async (req: Request, res: Response) => {
  try {
    const { timestamp, level, app, message } = req.body;
    await addLogToSupabase({
      timestamp,
      level,
      app,
      message: JSON.stringify(message),
    });
    res.json(true);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const getLogs = async (req: Request, res: Response) => {
  try {
    const logs = await getLogsFromSupabase();
    res.json(logs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
