import axios from "axios";
import supabase from "../../lib/supabase"
import { InvalidWebhookMethodError } from "../../model/errors";

export const sendTestNotification = async (user: string, webhook_id: string) => {
    const { data, error } = await supabase.from("user_webhooks").select("*").eq("id", webhook_id).eq(
        "user", user
    ).single();

    if (error) throw error;

    const webhook = data;
    if (!webhook) throw new Error("Webhook not found");

    switch (webhook.method) {
        case "GET":
            return await axios.get(webhook.url);
        case "POST":
            return await axios.post(webhook.url, webhook.body);
        default:
            throw new InvalidWebhookMethodError();
    }
}

export const getUserWebhooks = async (user: string) => {
    const {data, error} = await supabase.from("user_webhooks").select("*").eq("user", user);
    if (error) throw error;
    return data;
}

export const createUserWebhook = async ({
    user,
    url,
    method,
    body,
}: { user: string, url: string, method: string, body?: string }) => {
    if (method !== "GET" && method !== "POST") throw new InvalidWebhookMethodError();
    else if (method === "POST" && !body) throw new Error("Body is required for POST requests");

    const { error } = await supabase.from("user_webhooks").insert({
        user,
        url,
        method,
        body,
    })
    if (error) throw error;
}

export const deleteUserWebhook = async (user: string, id: string) => {
    const { error } = await supabase.from("user_webhooks").delete().eq("id", id).eq("user", user);
    if (error) throw error;
}

export const editWebhook = async ({
    id,
    user,
    url,
    method,
    body,
}: {
    id: string,
    user: string,
    url: string,
    method: string,
    body?: string,
}) => {
    if (method !== "GET" && method !== "POST") throw new InvalidWebhookMethodError();
    else if (method === "POST" && !body) throw new Error("Body is required for POST requests");

    const { error } = await supabase.from("user_webhooks").update({
        url,
        method,
        body,
    }).eq("id", id).eq("user", user);
    if (error) throw error;
}