import axios from "axios"

import { siteConfig } from "@/config/site"

export const fetchApps = async (user: string) => {
  const res = await axios.get(`${siteConfig.api.baseUrl}/apps?user=${user}`)
  return res.data
}
