import { getAccessToken } from "@/app/auth/auth";
import { siteConfig } from "@/config/site";
import axios from "axios";

export const fetchLogs = async (id: string, search?: string) => {
  const res = await axios.get(
    `${siteConfig.api.baseUrl}/logs?id=${id}${
      search ? `&search=${search}` : ""
    }`,
    {
      headers: {
        "x-api-key": getAccessToken(),
      },
    }
  );
  return res.data;
};
