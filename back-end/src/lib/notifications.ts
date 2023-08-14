import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const sendNotification = async ({url, method, body}:{ 
    url: string,
    method: string,
    body: string
}) => {
  return await axios({
    url,
    method,
    data: body
  })
}