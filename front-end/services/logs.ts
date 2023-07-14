import axios from "axios"

import { siteConfig } from "@/config/site"

export const fetchLogs = async (user: string, app: string) => {
  const res = await axios.get(
    `${siteConfig.api.baseUrl}/logs?user=${user}&app=${app}`
  )
  return res.data
}
