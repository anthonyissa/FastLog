import axios from "axios"

import { siteConfig } from "@/config/site"

export const fetchApps = async (user: string) => {
  const res = await axios.get(`${siteConfig.api.baseUrl}/apps?user=${user}`)
  return res.data
}

export const fetchApp = async (id: string) => {
  const res = await axios.get(`${siteConfig.api.baseUrl}/apps/${id}`)
  return res.data
}

export const createNewApp = async (name: string) => {
  const res = await axios.post(`${siteConfig.api.baseUrl}/apps/create`, {
    name,
  })
  return res.data
}

export const deleteUserApp = async (id: string) => {
  const res = await axios.post(`${siteConfig.api.baseUrl}/apps/delete`, {
    id,
  })
  return res.data
}

export const editUserApp = async (id: string, name: string, threshold: number) => {
  const res = await axios.post(`${siteConfig.api.baseUrl}/apps/edit`, {
    id,
    name,
    threshold,
  })
  return res.data
}
