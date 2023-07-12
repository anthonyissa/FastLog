import { Request, Response } from "express";
import {
  addNewAppToSupabase,
  getAppsFromSupabase,
} from "../services/appServices";
import { MissingRequiredFieldsError } from "../model/errors";

export const createApp = async (req: Request, res: Response) => {
  try {
    const { user, name } = req.body;
    if (!user || !name) throw new MissingRequiredFieldsError();

    await addNewAppToSupabase(user, name);
    res.json(true);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const getApps = async (req: Request, res: Response) => {
  try {
    const { user } = req.query;
    if (!user) throw new MissingRequiredFieldsError();
    const apps = await getAppsFromSupabase(user as string);
    res.json(apps);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
