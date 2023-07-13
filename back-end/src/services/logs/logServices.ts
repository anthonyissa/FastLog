import supabase from "../../lib/supabase";
import { concatLogArgs } from "./utils";

export const addLogToSupabase = async ({
  timestamp,
  level,
  app,
  user,
  ...args
}: {
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR";
  app: string;
  user: string;
  [key: string]: any;
}) => {
  const message =
    Object.keys(args).length === 1 ? args[Object.keys(args)[0]] : concatLogArgs(args);
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
