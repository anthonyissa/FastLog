import supabase from "../../lib/supabase";

export const addNewAppToSupabase = async (user: string, name: string) => {
  const { error } = await supabase.from("apps").insert({
    user,
    name,
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

export const deleteAppFromSupabase = async (user: string, appName: string) => {
  const { error } = await supabase
    .from("apps")
    .delete()
    .eq("user", user)
    .eq("name", appName);
  if (error) {
    throw error;
  }
}

export const editStatusThresholdInSupabase = async (
  user: string,
  appName: string,
  threshold: number
) => {
  const { error } = await supabase
    .from("apps")
    .update({ status_threshold: threshold })
    .eq("user", user)
    .eq("name", appName);
  if (error) {
    throw error;
  }
}