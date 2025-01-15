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