import supabase from "../../lib/supabase";

export const sendEventToSupabase = async (event:any) => {
    const { error } = await supabase.from("events").insert(event);
    if (error) {
        throw error;
    }
}

export const getEventsFromSupabase = async (user: string, id: string) => {
    const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("user", user)
        .eq("app", id);
    if (error) {
        throw error;
    }
    return data;
}