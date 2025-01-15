import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseClient: SupabaseClient | null = null;

export const getClient = (): SupabaseClient => {
  if (!supabaseClient) {
    if (!supabaseURL || !supabaseAnonKey) {
      throw new Error("Missing Supabase environment variables.");
    }
    supabaseClient = createClient(supabaseURL, supabaseAnonKey);
  }
  return supabaseClient;
};