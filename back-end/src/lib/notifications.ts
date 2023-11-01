import axios from "axios";
import dotenv from "dotenv";
import {
  getAppFromSupabase,
  getAppWebhook,
} from "../services/apps/appServices";
dotenv.config();

export const sendStatusNotification = async ({
  app,
  url,
  method,
  body,
}: {
  app: string;
  url: string;
  method: string;
  body: string;
}) => {
  const message = "🚨 " + app + " is down!";
  url = url.replace("{title}", message).replace("{message}", "");
  body = body.replace("{title}", message).replace("{message}", "");
  return await axios({
    url,
    method,
    data: body,
  });
};

export const sendEventNotification = async ({
  title,
  message,
  url,
  method,
  body,
}: {
  title: string;
  message: string;
  url: string;
  method: string;
  body: string;
}) => {
  url = url.replace("{title}", title).replace("{message}", message);
  body = body.replace("{title}", title).replace("{message}", message);
  return await axios({
    url,
    method,
    data: body,
  });
};

export const sendNotificationToUser = async ({
  app_id,
  type,
  title,
  message,
  user_id,
}: {
  app_id: string;
  type: "status" | "event";
  title?: string;
  message?: string;
  user_id?: string;
}) => {
  if (type === "event" && (!title || !message)) return;
  if (type === "status" && !user_id) return;

  const webhook: any = await getAppWebhook(app_id);
  if (!webhook) return;

  if (type === "status") {
    const app = await getAppFromSupabase(user_id, app_id);
    await sendStatusNotification({
      app: app.name,
      url: webhook.url,
      method: webhook.method,
      body: webhook.body,
    });
  } else if (type === "event") {
    await sendEventNotification({
      title,
      message,
      url: webhook.url,
      method: webhook.method,
      body: webhook.body,
    });
  }
};
