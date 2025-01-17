import { getClient } from "./supabase";
import { CartItem } from "../types";

export const getAllProducts = async () => {
  const client = getClient();
  const { data, error } = await client.from("products").select();
  if (error) throw error;
  return data;
};

export const getUser = async () => {
  const client = getClient();
  const { data, error } = await client.from("users").select();
  if (error) throw error;
  return data;
};

export const purchaseVouchers = async (purchase_items : CartItem[]) => {
  const client = getClient();
  const { error } = await client.rpc('process_purchase', { purchase_items });
  if (error) throw error;
}

export const getVoucher = async () => {
  const client = getClient();
  const { data, error } = await client.from("vouchers").select();
  if (error) throw error;
  return data;
}
