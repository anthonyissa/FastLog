import supabase from "../../lib/supabase";

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

export const deleteAppFromSupabase = async (user: string, app: string) => {
  const { error } = await supabase
    .from("apps")
    .delete()
    .eq("user", user)
    .eq("name", app);
  if (error) {
    throw error;
  }
}

export const editStatusThresholdInSupabase = async (
  user: string,
  app: string,
  threshold: number
) => {
  const { error } = await supabase
    .from("apps")
    .update({ status_threshold: threshold })
    .eq("user", user)
    .eq("name", app);
  if (error) {
    throw error;
  }
}