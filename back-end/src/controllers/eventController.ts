import { Request, Response } from "express";
import { MissingRequiredFieldsError } from "../model/errors";
import {
  getEventsFromSupabase,
  sendEventToSupabase,
} from "../services/events/eventServices";
import { sendNotificationToUser } from "../lib/notifications";

export const addEvent = async (req: Request, res: Response) => {
  try {
    const { timestamp, message, title, userId, id, notify } = req.body;
    const notification = !notify ? false : true;
    if (!timestamp || !message || !title || !id || !userId)
      throw new MissingRequiredFieldsError();
    await sendEventToSupabase({
      timestamp,
      app: id,
      user: userId,
      message,
      title,
    });
    if (notification) {
      await sendNotificationToUser({
        app_id: id,
        type: "event",
        title,
        message,
      });
    }
    res.json(true);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    if (!id) throw new MissingRequiredFieldsError();

    const events = await getEventsFromSupabase(req["userId"], id as string);
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
