import { getClient } from "./supabase";
import { CartItem } from "../types";

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

export const purchaseVouchers = async (items : CartItem[]) => {
  const mapped = items.map(item => ({
    product_id: item.id,
    user_id: '603a778b-31fc-4491-a78e-182b52db0a60',
    points: item.points,
    expired_at: null,
  }));

  const client = getClient();
  const { error } = await client.from("voucher").insert(mapped);
  if (error) throw error;
}

export const getVoucher = async () => {
  const voucher = [
    {
      id: 1,
      user_id: 1234567,
      product_id: 7654321,
      price: 2.50,
      is_expired: false,
      created_at: 1736937366609,
      expired_at: 1736937366609 + 1209600000, // creation+2weeks
    },

    {
      id: 2,
      user_id: 1234567,
      product_id: 8765432,
      price: 2.50,
      is_expired: false,
      created_at: 1635937266609,
      expired_at: 1635937266609 + 1209600000, // creation+2weeks
    }
  ]
  return voucher
}