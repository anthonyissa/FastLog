import { sendTelegramNotification } from "@aitox/notifications";
import dotenv from "dotenv";
dotenv.config();

export const sendNotification = async ({userId, appId, message}:{userId: string, appId: string, message: string}) => {
    // TODO get user notifications preferences from supabase and send
    await sendTelegramNotification(
        process.env.TELEGRAM_BOT_TOKEN,
        process.env.TELEGRAM_CHAT_ID,
        message
      );
}