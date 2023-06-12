import { Request, Response } from "express";
import { addLogToSupabase } from "../services/logServices";

export const addLog = async (req: Request, res: Response) => {
  try {
    const { timestamp, level, message } = req.body;
    await addLogToSupabase({
      timestamp,
      level,
      message: JSON.stringify(message),
    });
    res.json(true);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
