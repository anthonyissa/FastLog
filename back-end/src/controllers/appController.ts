import { Request, Response } from "express";
import {
  addNewAppToSupabase,
  deleteAppFromSupabase,
  editStatusThresholdInSupabase,
  getAppsFromSupabase,
} from "../services/apps/appServices";
import { MissingRequiredFieldsError } from "../model/error";

export const createApp = async (req: Request, res: Response) => {
  try {
    const { user, name } = req.body;
    if (!user || !name) throw new MissingRequiredFieldsError();

    await addNewAppToSupabase(user, name);
    res.json(true);
  } catch (error) {
    console.error(error);
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
    console.error(error);
    res.status(500).json({ error });
  }
};

export const deleteApp = async (req: Request, res: Response) => {
  try {
    const { user, app } = req.body;
    if (!user || !app) throw new MissingRequiredFieldsError();

    await deleteAppFromSupabase(user as string, app as string);
    res.json(true);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const editStatusThreshold = async (req: Request, res: Response) => {
  try {
    const { user, app, threshold } = req.body;
    if (!user || !app || !threshold) throw new MissingRequiredFieldsError();

    await editStatusThresholdInSupabase(
      user as string,
      app as string,
      threshold as number
    );
    res.json(true);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
