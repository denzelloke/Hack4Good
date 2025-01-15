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

export const getVoucher = async () => {
  const voucher = [
    {
      voucher_id: 1,
      user_id: 1234567,
      product_id: 7654321,
      price: 2.50,
      is_expired: false,
      created_at: 1736937366609,
      expired_at: 1736937366609 + 1209600000, // creation+2weeks
    }
  ]
  return voucher
};