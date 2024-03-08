import { createClient } from "@supabase/supabase-js";
import { Database } from "../../database.types";
import { env } from "../env";

const supabase = createClient<Database>(
	env.NEXT_PUBLIC_SUPABASE_URL,
	env.NEXT_PUBLIC_SUPABASE_API_KEY,
);

export default supabase;
