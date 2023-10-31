import WebSocket from "ws";
import { status } from "./model/socket-types";
import { handleSocketStatusUpdate } from "./lib/statusWatcher";

export const initWebsocket = (http: any) => {
  const wss = new WebSocket.Server({ server: http });

  wss.on("connection", (ws: WebSocket) => {
    ws.on("message", async (message: string) => {
      try {
        const data = JSON.parse(message);
        handleSocketStatusUpdate(data as status).catch((error) => {
          throw error;
        });
      } catch (error) {
        console.log(error);
        ws.send(error);
      }
    });

    ws.send("Connected to FastLog!");
  });

  return wss;
};
