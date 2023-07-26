import { Request, Response } from "express";
import {
  addNewAppToSupabase,
  deleteAppFromSupabase,
  editAppInSupabase,
  getAppFromSupabase,
  getAppsFromSupabase,
} from "../services/apps/appServices";
import { MissingRequiredFieldsError } from "../model/error";

export const createApp = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) throw new MissingRequiredFieldsError();

    await addNewAppToSupabase("antho", name); // TODO replace with user from auth
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
    const { name } = req.body;
    if (!name) throw new MissingRequiredFieldsError();

    await deleteAppFromSupabase("antho", name as string); // TODO replace with user from auth
    res.json(true);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const editApp = async (req: Request, res: Response) => {
  try {
    const { id, name, threshold } = req.body;
    if (!id || !name || !threshold) throw new MissingRequiredFieldsError();

    await editAppInSupabase(
      id as number,
      name as string,
      threshold as number
    );
    res.json(true);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const getApp = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    if (!name) throw new MissingRequiredFieldsError();

    const app = await getAppFromSupabase("antho", name as string); // TODO replace with user from auth
    res.json(app);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
