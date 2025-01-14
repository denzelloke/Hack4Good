import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseClient: SupabaseClient | null = null;

// Gets (or creates, if needed) a client to the Supabase servers
export const getClient = () => {
  if (!supabaseClient) {
    if (!supabaseURL || !supabaseAnonKey) {
      throw new Error(
        "Failed to connect to Supabase Database. Missing Vite environment variables."
      );
    }
    supabaseClient = createClient(supabaseURL, supabaseAnonKey);
  }
  return supabaseClient;
};

export const getAllProducts = async () => {
  const client = getClient();
  const { data, error } = await client.from("product").select();
  if (error) throw new Error("getAllProducts() call failed. Error: " + error.message);
  return data;
};

export const getUser = async () => {
  const user = [
    {
      id: '1234567',
      username: 'denzel',
      points: 13,
    }
  ]
  return user
};

