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

export const getAppFromSupabase = async (user: string, name: string) => {
  const { data, error } = await supabase
    .from("apps")
    .select("*")
    .eq("user", user)
    .eq("name", name);
  if (error) {
    throw error;
  }
  return data[0];
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

export const editAppInSupabase = async (
  id: number,
  appName: string,
  threshold: number
) => {
  const { error } = await supabase
    .from("apps")
    .update({ status_threshold: threshold, name: appName })
    .eq("id", id);
  if (error) {
    throw error;
  }
}