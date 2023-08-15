import { Request, Response } from "express";
import {
  addNewAppToSupabase,
  deleteAppFromSupabase,
  editAppInSupabase,
  getAppFromSupabase,
  getAppsFromSupabase,
  heartbeatApp,
  setWebhookOnApp,
} from "../services/apps/appServices";
import { MissingRequiredFieldsError } from "../model/errors";

export const createApp = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) throw new MissingRequiredFieldsError();

    await addNewAppToSupabase(req["userId"], name);
    res.json(true);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const getApps = async (req: Request, res: Response) => {
  try {
    const apps = await getAppsFromSupabase(req["userId"]);
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

    await deleteAppFromSupabase(req["userId"], id as string);
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

    const app = await getAppFromSupabase(req["userId"], id as string);
    res.json(app);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}

export const setWebhook = async (req: Request, res: Response) => {
  try {
    const { appId, webhookId } = req.body;
    if (!appId) throw new MissingRequiredFieldsError();

    await setWebhookOnApp(req["userId"], appId as string, webhookId as string);
    res.json(true);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}

export const heartbeat = async (req: Request, res: Response) => {
  try {
    const { id, userId } = req.body;
    if (!id || !userId) throw new MissingRequiredFieldsError();

    await heartbeatApp(id, userId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}