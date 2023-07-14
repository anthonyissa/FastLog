import axios from "axios"

import { siteConfig } from "@/config/site"

export const fetchApps = async (user: string) => {
  const res = await axios.get(`${siteConfig.api.baseUrl}/apps?user=${user}`)
  return res.data
}

export const createNewApp = async (name: string) => {
  const res = await axios.post(`${siteConfig.api.baseUrl}/apps/create`, {
    name,
  })
  return res.data
}

export const deleteUserApp = async (name: string) => {
  const res = await axios.post(`${siteConfig.api.baseUrl}/apps/delete`, {
    name,
  })
  return res.data
}
