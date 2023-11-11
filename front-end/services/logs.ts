import { getAccessToken } from "@/app/auth/auth";
import { siteConfig } from "@/config/site";
import axios from "axios";

export const fetchLogs = async ({
  id,
  search,
  page = 0,
}: {
  id: string;
  search?: string;
  page?: number;
}) => {
  const res = await axios.get(
    `${siteConfig.api.baseUrl}/logs?id=${id}${
      search ? `&search=${search}` : ""
    }&page=${page}`,
    {
      headers: {
        "x-api-key": getAccessToken(),
      },
    }
  );
  return res.data;
};
