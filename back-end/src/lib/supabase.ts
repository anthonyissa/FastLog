import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config()

export default createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);