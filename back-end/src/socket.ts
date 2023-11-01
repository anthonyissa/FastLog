import { status } from "./model/socket-types";
import { handleSocketStatusUpdate } from "./lib/statusWatcher";
import { WebSocket } from "ws";
import { sendNotificationToUser } from "./lib/notifications";

const statusCache = new Map<string, string>(); // switch to redis to avoid memory usage

export const initWebsocket = (http: any) => {
  const wss = new WebSocket.Server({ server: http });

  wss.on("connection", (ws: WebSocket, req: any) => {
    const id = req.headers["sec-websocket-key"];
    console.log("New connection: " + id);
    ws.on("message", async (message: string) => {
      try {
        console.log("Message received: " + message);
        const data = JSON.parse(message) as status;
        if (!(await handleSocketStatusUpdate({ ...data, status: "UP" })))
          throw new Error(
            "Error in handleSocketStatusUpdate - socket.ts " +
              JSON.stringify(data)
          );
        statusCache.set(id, data.user_id + ":" + data.app_id);
      } catch (error) {
        console.log({ error });
        ws.send(
          "Error in Fastlog healthcheck, ensure that you are sending the right parameters!"
        );
      }
    });

    ws.on("close", async () => {
      try {
        const [userId, appId] = statusCache.get(id).split(":");
        await handleSocketStatusUpdate({
          user_id: userId,
          app_id: appId,
          status: "DOWN",
        });
        await sendNotificationToUser({
          app_id: appId,
          type: "status",
          user_id: userId,
        });
        statusCache.delete(id);
      } catch (error) {
        console.log({ error });
      }
    });

    ws.send("Connected to FastLog!");
  });

  return wss;
};
