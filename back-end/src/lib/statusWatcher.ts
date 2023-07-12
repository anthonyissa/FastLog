import supabase from "./supabase";

export const launchStatusWatcher = async () => {
  setInterval(async () => {
    try {
      const { data: apps, error: appsError } = await supabase
        .from("apps")
        .select("*");
      if (appsError) throw appsError;

      const thresholdsMap = new Map<string, number>();
      for (const app of apps) {
        thresholdsMap.set(app.name, app.status_threshold);
      }

      const { data: logs, error: logsError } = await supabase.rpc(
        "get_latest_logs"
      );
      if (logsError) throw logsError;

      const downApps: string[] = [];
      for (const log of logs) {
        const timestamp = new Date(log.timestamp).getTime();
        const timeSince = Date.now() - timestamp;
        if (timeSince > thresholdsMap.get(log.app)) {
          downApps.push(log.app);
        }
      }
      const upApps = apps
        .map((app) => app.name)
        .filter((app) => !downApps.includes(app));
      await updateAppsStatus(downApps, upApps);
    } catch (error) {
      console.error("Error in launchStatusWatcher - statusWatcher.ts:", error);
    }
  }, 5000);
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
