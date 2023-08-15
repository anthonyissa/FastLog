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

export const getAppFromSupabase = async (user: string, id: string) => {
  const { data, error } = await supabase
    .from("apps")
    .select("*")
    .eq("user", user)
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data[0];
};

export const deleteAppFromSupabase = async (user: string, id: string) => {
  const { error } = await supabase
    .from("apps")
    .delete()
    .eq("user", user)
    .eq("id", id);
  if (error) {
    throw error;
  }
}

export const editAppInSupabase = async (
  id: string,
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

export const setWebhookOnApp = async (user: string, appId: string, webhookId: string) => {
  const { error } = await supabase
    .from("apps")
    .update({ webhook_id: webhookId })
    .eq("id", appId)
    .eq("user", user);
  if (error) {
    throw error;
  }
}

export const getAppWebhook = async (appId:string) => {
  const { data, error } = await supabase
    .from("apps")
    .select("user_webhooks (*)")
    .eq("id", appId).single() // TODO - check if this is not hackable (id can be confounded with webhook id)
  if (error) {
    throw error;
  }
  return data.user_webhooks;
}