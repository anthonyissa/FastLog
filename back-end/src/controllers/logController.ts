import { Request, Response } from "express";
import {
  addLogToSupabase,
  getLogsFromSupabase,
} from "../services/logs/logServices";
import { MissingRequiredFieldsError } from "../model/errors";

export const addLog = async (req: Request, res: Response) => {
  try {
    const { timestamp, level, userId, id, ...args } = req.body;
    if (!timestamp || !level || !id || !userId)
      throw new MissingRequiredFieldsError();
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
    const { id, search, page, timeStart, timeEnd } = req.query;
    if (!id) throw new MissingRequiredFieldsError();
    if ((timeStart || timeEnd) && !(timeStart && timeEnd))
      throw new Error("Must provide both timeStart and timeEnd or neither");

    const logs = await getLogsFromSupabase({
      user: req["userId"],
      id: id as string,
      search: search as string,
      page: parseInt(page as string),
      timeStart: timeStart as string,
      timeEnd: timeEnd as string,
    });
    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
