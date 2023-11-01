import axios from "axios";
import dotenv from "dotenv";
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
