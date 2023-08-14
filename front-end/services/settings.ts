import { getAccessToken } from "@/app/auth/auth"
import { siteConfig } from "@/config/site"
import { Webhook } from "@/types/Webhook"
import axios from "axios"

export const fetchWebhooks = async () => {
    const res = await axios.get(
        `${siteConfig.api.baseUrl}/notifications/webhooks`, {
        headers: {
            "x-api-key": getAccessToken()
        }
    })
    return res.data
}

export const deleteUserWebhook = async (id: string) => {
    const res = await axios.delete(
        `${siteConfig.api.baseUrl}/notifications/delete-webhook?id=${id}`, {
        headers: {
            "x-api-key": getAccessToken()
        }
    })
    return res.data
}

export const createUserWebhook = async (webhook: Webhook) => {
    const res = await axios.post(
        `${siteConfig.api.baseUrl}/notifications/create-webhook`, webhook, {
        headers: {
            "x-api-key": getAccessToken()
        }
    })
    return res.data
}

export const editUserWebhook = async (webhook: Webhook) => {
    const res = await axios.post(
        `${siteConfig.api.baseUrl}/notifications/edit-webhook`, webhook, {
        headers: {
            "x-api-key": getAccessToken()
        }
    })
    return res.data
}