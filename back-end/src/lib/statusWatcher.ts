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

      const thresholdsMap = new Map<
        string,
        {
          status_threshold: number;
          status: "UP" | "DOWN";
          name: string;
          user_webhooks: { url: string; method: string; body: string };
        }
      >();
      for (const app of apps) {
        thresholdsMap.set(app.id, {
          status_threshold: app.status_threshold,
          status: app.status,
          name: app.name,
          user_webhooks: app.user_webhooks,
        });
      }

      const { data: logs, error: logsError } =
        await supabase.rpc("get_latest_logs");
      if (logsError) throw logsError;

      const downApps: string[] = [];
      for (const log of logs) {
        if (
          !thresholdsMap.has(log.app) ||
          !thresholdsMap.get(log.app).status_threshold
        )
          // Ignore these apps, because they're still being set up
          continue;
        const timestamp = new Date(log.timestamp).getTime();
        const timeSince = Date.now() - timestamp;
        const app = thresholdsMap.get(log.app);
        if (timeSince > app.status_threshold) {
          downApps.push(log.app);
          if (app.status === "UP")
            await sendStatusNotification({
              app: app.name,
              url: app.user_webhooks.url,
              method: app.user_webhooks.method,
              body: app.user_webhooks.body,
            });
        }
      }
      const upApps = apps
        .map((app) => app.id)
        .filter((app) => !downApps.includes(app));
      await updateAppsStatus(downApps, upApps);
    } catch (error) {
      console.error("Error in launchStatusWatcher - statusWatcher.ts:", error);
    }
  }, 1000 * 60);
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

export const handleSocketStatusUpdate = async ({
  app_id,
  user_id,
  status,
}: {
  app_id: string;
  user_id: string;
  status: "UP" | "DOWN";
}) => {
  if (!app_id || !user_id || !status)
    throw new Error("Invalid handleSocketStatusUpdate data");
  // TODO
  console.log("handleSocketStatusUpdate");
};
