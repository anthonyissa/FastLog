import supabase from "../lib/supabase";

export const addLogToSupabase = async ({
  timestamp,
  level,
  app,
  user,
  message,
}: {
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR";
  app: string;
  user: string;
  message: string;
}) => {
  const { error } = await supabase.from("logs").insert({
    timestamp,
    level,
    app,
    user,
    message,
  });
  if (error) {
    throw error;
  }
};

export const getLogsFromSupabase = async (user: string, app: string) => {
  const { data, error } = await supabase
    .from("logs")
    .select("*")
    .eq("user", user)
    .eq("app", app);
  if (error) {
    throw error;
  }
  return data;
};
