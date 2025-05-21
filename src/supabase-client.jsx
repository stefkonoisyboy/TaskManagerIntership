import {createClient} from "@supabase/supabase-js";

const supabaseURL="https://uuqxrtwzmlybfxqxuoxc.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

 const supabase = createClient(supabaseURL,supabaseAnonKey);
 export default supabase;