import axios from "axios"

import { siteConfig } from "@/config/site"
import { getAccessToken } from "@/app/auth/auth"

export const fetchEvents = async (id: string) => {
  const res = await axios.get(
    `${siteConfig.api.baseUrl}/events?id=${id}`,  {
      headers:{
        "x-api-key": getAccessToken()
      }
    }
  )
  return res.data
}
