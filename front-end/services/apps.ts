import axios from "axios"

import { siteConfig } from "@/config/site"
import { getAccessToken } from "@/app/auth/auth"

export const fetchApps = async () => {
  const res = await axios.get(`${siteConfig.api.baseUrl}/apps`, {
    headers:{
      "x-api-key": getAccessToken()
    }
  })
  return res.data
}

export const fetchApp = async (id: string) => {
  const res = await axios.get(`${siteConfig.api.baseUrl}/apps/${id}`,  {
    headers:{
      "x-api-key": getAccessToken()
    }
  })
  return res.data
}

export const createNewApp = async (name: string) => {
  const res = await axios.post(`${siteConfig.api.baseUrl}/apps/create`, {
    name
  }, {
    headers:{
      "x-api-key": getAccessToken(),
      "Content-Type": "application/json"
    }
  })
  return res.data
}

export const deleteUserApp = async (id: string) => {
  const res = await axios.post(`${siteConfig.api.baseUrl}/apps/delete`, {
    id,
  }, {
    headers:{
      "x-api-key": getAccessToken(),
      "Content-Type": "application/json"
    }
  })
  return res.data
}

export const editUserApp = async (id: string, name: string, threshold: number) => {
  const res = await axios.post(`${siteConfig.api.baseUrl}/apps/edit`, {
    id,
    name,
    threshold
  }, {
    headers:{
      "x-api-key": getAccessToken(),
      "Content-Type": "application/json"
    }
  })
  return res.data
}

export const setWebhook = async (appId:string, webhookId:string | null) => {
  const res = await axios.post(`${siteConfig.api.baseUrl}/apps/set-webhook`, {
    appId,
    webhookId
  }, {
    headers:{
      "x-api-key": getAccessToken(),
      "Content-Type": "application/json"
    }
  })
  return res.data
}