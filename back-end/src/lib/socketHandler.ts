import { sendNotificationToUser } from "./notifications";
import { handleSocketStatusUpdate } from "./statusWatcher";

export const statusCache = new Map<string, string>(); // switch to redis to avoid memory usage
export const heartbeatInterval = 60 * 1000 * 3; // 3 minute

export const removeFromStatusCache = (id: string) => {
  statusCache.delete(id);
};

export const isAppInStatusCache = (app_id: string, user_id: string) => {
  for (const [_, value] of statusCache.entries()) {
    if (value === user_id + ":" + app_id) return true;
  }
  return false;
};

export const handleClosedConnection = async ({
  id,
  heartbeat,
}: {
  id: string;
  heartbeat: NodeJS.Timer;
}) => {
  try {
    console.log("Connection closed: " + id);
    clearInterval(heartbeat);
    const [userId, appId] = statusCache.get(id).split(":");
    removeFromStatusCache(id);

    setTimeout(async () => {
      if (isAppInStatusCache(appId, userId)) return;

      await sendNotificationToUser({
        app_id: appId,
        type: "status",
        user_id: userId,
      });
      await handleSocketStatusUpdate({
        user_id: userId,
        app_id: appId,
        status: "DOWN",
      });
      statusCache.delete(id);
    }, 60 * 1000);
  } catch (error) {
    console.log({ error });
  }
};
