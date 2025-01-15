import { getClient } from "./supabase";

export const getAllProducts = async () => {
  const client = getClient();
  const { data, error } = await client.from("product").select();
  if (error) throw error;
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