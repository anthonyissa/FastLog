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
    const { id } = req.body;
    if (!id) throw new MissingRequiredFieldsError();

    await deleteAppFromSupabase("antho", id as string); // TODO replace with user from auth
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
      id as string,
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
    const { id } = req.params;
    if (!id) throw new MissingRequiredFieldsError();

    const app = await getAppFromSupabase("antho", id as string); // TODO replace with user from auth
    res.json(app);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
