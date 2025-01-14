// Use this file to get data from supabase
import { createClient } from "@supabase/supabase-js";
const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Gets (or creates, if needed) a client to the supabase servers
const getClient = () => {
  if (supabaseURL && supabaseAnonKey) {
    const client = createClient(supabaseURL, supabaseAnonKey);
    return client;
  } else {
    throw new Error(
      "Failed to connect to Supabase Database. Missing Vite environment variables."
    );
  }
};

export const getAllProducts = async () => {
  const client = getClient();
  const { data, error } = await client.from("product").select();
  if (error) throw new Error("getAllProducts() call failed. Error: " + error.message);
  return data;
};

export const getAccountDetails = async () => {
  return [];
}