import axios from "axios"

import { siteConfig } from "@/config/site"

export const fetchLogs = async (user: string, id: string) => {
  const res = await axios.get(
    `${siteConfig.api.baseUrl}/logs?user=${user}&id=${id}`
  )
  return res.data
}
