import { getAccessToken } from "@/app/auth/auth";
import { siteConfig } from "@/config/site";
import axios from "axios";

export const fetchLogs = async ({
  id,
  search,
  page = 0,
  timeStart,
  timeEnd,
}: {
  id: string;
  search?: string;
  page?: number;
  timeStart?: string;
  timeEnd?: string;
}) => {
  const res = await axios.get(
    `${siteConfig.api.baseUrl}/logs?id=${id}${
      search ? `&search=${search}` : ""
    }&page=${page}
    ${timeStart ? `&timeStart=${timeStart}` : ""}${
      timeEnd ? `&timeEnd=${timeEnd}` : ""
    }`,
    {
      headers: {
        "x-api-key": getAccessToken(),
      },
    }
  );
  return res.data;
};
