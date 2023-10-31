import WebSocket from "ws";
import { status } from "./model/socket-types";
import { handleSocketStatusUpdate } from "./lib/statusWatcher";

// Add redis to cache
export const initWebsocket = (http: any) => {
  const wss = new WebSocket.Server({ server: http });

  wss.on("connection", (ws: WebSocket) => {
    ws.on("message", async (message: string) => {
      try {
        const data = JSON.parse(message);
        if (!(await handleSocketStatusUpdate(data as status)))
          throw new Error(
            "Error in handleSocketStatusUpdate - socket.ts " +
              JSON.stringify(data)
          );
      } catch (error) {
        console.log({ error });
        ws.send("Error in updating status, check the parameters!");
      }
    });

    ws.send("Connected to FastLog!");
  });

  wss.on("close", (ws: WebSocket) => {
    console.log("Websocket closed");
  });

  return wss;
};
