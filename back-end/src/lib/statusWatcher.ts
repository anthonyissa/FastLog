import supabase from "./supabase";
import { sendTelegramNotification } from "@aitox/notifications";
import dotenv from "dotenv";
dotenv.config();

export const launchStatusWatcher = async () => {
  setInterval(async () => {
    try {
      const { data: apps, error: appsError } = await supabase
        .from("apps")
        .select("*");
      if (appsError) throw appsError;

      const thresholdsMap = new Map<
        string,
        { status_threshold: number; status: "UP" | "DOWN" }
      >();
      for (const app of apps) {
        thresholdsMap.set(app.id, {
          status_threshold: app.status_threshold,
          status: app.status,
        });
      }

      const { data: logs, error: logsError } = await supabase.rpc(
        "get_latest_logs"
      );
      if (logsError) throw logsError;

      const downApps: string[] = [];
      for (const log of logs) {
        if (
          !thresholdsMap.has(log.app) ||
          !thresholdsMap.get(log.app).status_threshold
        )
          continue;
        const timestamp = new Date(log.timestamp).getTime();
        const timeSince = Date.now() - timestamp;
        if (timeSince > thresholdsMap.get(log.app).status_threshold) {
          downApps.push(log.app);
          if (thresholdsMap.get(log.app).status === "UP")
            await sendTelegramNotification(
              process.env.TELEGRAM_BOT_TOKEN,
              process.env.TELEGRAM_CHAT_ID,
              `🔴 ${log.app} is down!`
            );
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
      .in("name", downApps);
    if (error) throw error;

    const { error: error2 } = await supabase
      .from("apps")
      .update({ status: "UP" })
      .eq("status", "DOWN")
      .in("name", upApps);
    if (error2) throw error2;
  } catch (error) {
    console.error("Error in updateAppsStatus - statusWatcher.ts :", error);
  }
};
