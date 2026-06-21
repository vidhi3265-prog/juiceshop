import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://oaqvybxbzrwyehtspnhl.supabase.co";
const supabaseAnonKey = "sb_publishable_4G-suR31GQMXi_iyloBhXg_e3juMnJl";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);