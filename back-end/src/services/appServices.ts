import supabase from "../lib/supabase";

export const addNewAppToSupabase = async (user: string, app: string) => {
  const { error } = await supabase.from("apps").insert({
    user,
    app,
  });
  if (error) {
    throw error;
  }
};

export const getAppsFromSupabase = async (user: string) => {
  const { data, error } = await supabase
    .from("apps")
    .select("*")
    .eq("user", user);
  if (error) {
    throw error;
  }
  return data;
};
