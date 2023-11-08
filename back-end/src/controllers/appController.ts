import { Request, Response } from "express";
import {
  addNewAppToSupabase,
  deleteAppFromSupabase,
  editAppInSupabase,
  getAppFromSupabase,
  getAppsFromSupabase,
  setWebhookOnApp,
} from "../services/apps/appServices";
import {
  InvalidStatusError,
  MissingRequiredFieldsError,
} from "../model/errors";
import { handleSocketStatusUpdate } from "../lib/statusWatcher";
import { sendNotificationToUser } from "../lib/notifications";

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

    await editAppInSupabase(id as string, name as string, threshold as number);
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
};

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
};

export const setStatus = async (req: Request, res: Response) => {
  try {
    const { app_id, user_id, status } = req.body;
    if (!app_id || !user_id) throw new MissingRequiredFieldsError();
    if (!["UP", "DOWN"].includes(status)) throw new InvalidStatusError();

    const result = await handleSocketStatusUpdate({
      app_id,
      user_id,
      status,
    });
    if (status === "DOWN")
      await sendNotificationToUser({
        app_id,
        user_id,
        type: "status",
      });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
