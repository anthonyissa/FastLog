import { status } from "./model/socket-types";
import { handleSocketStatusUpdate } from "./lib/statusWatcher";
import { WebSocket } from "ws";
import { sendNotificationToUser } from "./lib/notifications";
import {
  handleClosedConnection,
  heartbeatInterval,
  isAppInStatusCache,
  removeFromStatusCache,
  statusCache,
} from "./lib/socketHandler";

export const initWebsocket = (http: any) => {
  const wss = new WebSocket.Server({ server: http });

  wss.on("connection", (ws: WebSocket, req: any) => {
    const id = req.headers["sec-websocket-key"];
    console.log("New connection: " + id);

    const heartbeat = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        console.log("Sending heartbeat to: " + id);
        ws.ping();
      } else {
        clearInterval(heartbeat);
      }
    }, heartbeatInterval);

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
      await handleClosedConnection({ id, heartbeat });
    });

    ws.send("Connected to FastLog!");
  });

  return wss;
};
