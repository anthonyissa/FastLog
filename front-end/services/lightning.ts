import { getAccessToken } from "@/app/auth/auth";
import { siteConfig } from "@/config/site";
import axios from "axios";

export const getUserInvoice = async () => {
  const res = await axios.get(
    `${siteConfig.api.baseUrl}/lightning/getInvoice`,
    {
      headers: {
        "x-api-key": getAccessToken(),
      },
    }
  );
  return res.data;
};

export const checkIfUserPaid = async () => {
  const res = await axios.get(
    `${siteConfig.api.baseUrl}/lightning/checkIfUserPaid`,
    {
      headers: {
        "x-api-key": getAccessToken(),
      },
    }
  );
  return res.data;
};
