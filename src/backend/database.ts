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
  const { error } = await client.rpc('process_purchase', { purchase_items });
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

  export const getAuctionItem = async () => {
    const auctionItem = [ 
      {
        id: '1',
        product_id: 'a',
        name: 'Luxury Chair',
        description: 'A handcrafted luxury chair made from premium materials.',
        url: '',
        currentBid: 150,
        auctionEndTime: new Date(Date.now() + 3600 * 1000).toISOString(), // 1 hour from now
      }
    ]
    return auctionItem
  };


  export const getAllUsers = async () => {
    const client = getClient();
    const { data, error } = await client
      .from("users")
      .select("*") // Fetch all columns or specify the ones you need
        
    if (error) {
      console.error("Error fetching non-admin users:", error);
      throw error;
    }
  
    return data;
  };

  export const getBids = async () => {
    const bids = [
      {
        id: '1',
        product_id: 'a',
        user_id: '73fda6c0-82c9-4588-8f0b-e3200349b5c2',
        points: 1,
        created_at: 10000000,
      },
      {
        id: '2',
        product_id: 'a',
        user_id: 'a6c272a3-179d-47d1-8ebd-fe83ac7576df',
        points: 2,
        created_at: 20000000,
      },
      {
        id: '3',
        product_id: 'a',
        user_id: 'c4b3e8fd-7ace-4147-a8ce-85c9c8cce4f8',
        points: 3,
        created_at: 30000000,
      },
      {
        id: '4',
        product_id: 'a',
        user_id: 'ea619777-944b-4919-801f-c7b2bb41a69c',
        points: 4,
        created_at: 40000000,
      },
    ]
    return bids
  };