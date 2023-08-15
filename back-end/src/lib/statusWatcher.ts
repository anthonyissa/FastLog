import { sendStatusNotification } from "./notifications";
import supabase from "./supabase";
import dotenv from "dotenv";
dotenv.config();

export const launchStatusWatcher = async () => {
  setInterval(async () => {
    try {
      const { data: apps, error: appsError } = await supabase
        .from("apps")
        .select("*, user_webhooks (*)");
      if (appsError) throw appsError;
      
      const { upApps, downApps } = await getUpAndDownApps(apps);
      await updateAppsStatus(downApps, upApps);
    } catch (error) {
      console.error("Error in launchStatusWatcher - statusWatcher.ts:", error);
    }
  }, 1000 * 60);
};

export const getUpAndDownApps = async (apps:any[]) => {
  const upApps = [], downApps = [];
  for (const app of apps) {
    if (!app.last_heartbeat) continue;
    if (app.status === "UP" && isHeartbeatStale(app.last_heartbeat)) {
      downApps.push(app.id);
      await sendStatusNotification({
        app: app.name,
        url: app.user_webhooks.url,
        method: app.user_webhooks.method,
        body: app.user_webhooks.body
      })
    } else if (app.status === "DOWN" && !isHeartbeatStale(app.last_heartbeat)) {
      upApps.push(app.id);
    }
  }
  return { upApps, downApps };
}

export const isHeartbeatStale = (lastHeartbeat: string) => {
  const timestamp = new Date(lastHeartbeat).getTime();
  const timeSince = Date.now() - timestamp;
  return timeSince > 1000 * 60 * 2;
};

export const updateAppsStatus = async (
  downApps: string[],
  upApps: string[]
) => {
  try {
    const { error } = await supabase
      .from("apps")
      .update({ status: "DOWN" })
      .eq("status", "UP")
      .in("id", downApps);
    if (error) throw error;

    const { error: error2 } = await supabase
      .from("apps")
      .update({ status: "UP" })
      .eq("status", "DOWN")
      .in("id", upApps);
    if (error2) throw error2;
  } catch (error) {
    console.error("Error in updateAppsStatus - statusWatcher.ts :", error);
  }
};
