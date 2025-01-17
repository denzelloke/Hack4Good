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
  const { data : { user  } }  = await client.auth.getUser();
  if (!user || !user.id){
    throw new Error("User not found.");
  }

  const { data, error } = await client.from("users").select().eq("id",user.id);
  if (error) throw error;
  return data;
};

export const purchaseVouchers = async (purchase_items : CartItem[]) => {
  const client = getClient();
  const total_cost = purchase_items.reduce((acc, curr) => acc + curr.points * curr.quantity, 0);
  const { error } = await client.rpc('process_purchase', { purchase_items, total_cost });
  if (error) throw error;
}

export const getVoucher = async () => {
  const client = getClient();
  const { data, error } = await client.from("vouchers").select();
  if (error) throw error;
  return data;
}

export const claimVoucher = async (id : string) => {
  const client = getClient();
  const { error } = await client.from("vouchers").update({claimed_on: new Date().toISOString()}).eq("id",id);
  if (error) throw error;
}