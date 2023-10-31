import WebSocket from "ws";
import { status } from "./model/socket-types";
import { handleSocketStatusUpdate } from "./lib/statusWatcher";

export const initWebsocket = (http: any) => {
  const wss = new WebSocket.Server({ server: http });

  wss.on("connection", (ws: WebSocket) => {
    try {
      ws.on("message", async (message: string) => {
        try {
          const data = JSON.parse(message);
          await handleSocketStatusUpdate(data as status);
        } catch (error) {
          console.log(error);
          ws.send(error);
        }
      });
    } catch (error) {
      console.error("Error in initWebsocket - socket.ts:", error);
    }

    ws.send("Connected to FastLog!");
  });

  return wss;
};
