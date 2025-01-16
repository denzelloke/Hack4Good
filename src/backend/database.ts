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
      username: 'STANLEY CARTER',
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

//for account page blackbox
export const getVoucher = async () => {
  const voucher = [
    {
      id: '1',
      user_id: 'test_user',
      product_id: '7654321',
      points: 2.50,
      is_claimed: false,
      created_at: 1736937366609,
      claimed_on: 1736937366609 + 1209600000, // creation+2weeks
    },

    {
      id: '2',
      user_id: 'test_user',
      product_id: '8765432',
      points: 2.50,
      created_at: 1236937366609,
      claimed_on: null,
    },

    {
      id: '3',
      user_id: 'test_user',
      product_id: '8765432',
      points: 2.50,
      created_at: 1635937266609,
      claimed_on: null,
    }
  ]
  return voucher
}

//for account page blackbox
export const getProduct = async () => {
  const products = [
    {
      id: '7654321',
      name: 'Marigold UHT Milk',
      description: '06 x 200ml tetrapack',
      img: 'public/assets/Milk.jpg',
      points: 10,
      stock: 5,
      category: 'snacks',
    },

    {
      id: '8765432',
      name: 'Bananas',
      description: '200g bunch of bananas',
      img: 'public/assets/Bananas.jpg',
      points: 10,
      stock: 10,
      category: 'Fruits',
    }
  ]
  return products
};