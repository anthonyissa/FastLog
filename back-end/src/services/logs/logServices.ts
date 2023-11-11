import supabase from "../../lib/supabase";
import { concatLogArgs } from "./utils";

export const addLogToSupabase = async ({
  timestamp,
  level,
  id,
  user,
  ...args
}: {
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR";
  id: string;
  user: string;
  [key: string]: any;
}) => {
  const message =
    Object.keys(args).length === 1
      ? args[Object.keys(args)[0]]
      : concatLogArgs(args);
  const { error } = await supabase.from("logs").insert({
    timestamp,
    level,
    app: id,
    user,
    message,
  });
  if (error) {
    throw error;
  }
};

export const getLogsFromSupabase = async (
  user: string,
  id: string,
  search: string,
  page: number = 0
) => {
  const start = page === -1 ? 0 : page * 100;
  const end = page === -1 ? 10000 : (page + 1) * 100 - 1;
  const { data, error } = await supabase
    .from("logs")
    .select("*")
    .eq("user", user)
    .eq("app", id)
    .ilike("message", `%${search ?? ""}%`)
    .range(start, end)
    .order("timestamp", { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};
