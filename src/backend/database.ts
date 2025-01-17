import { getClient } from "./supabase";
import { CartItem, Product } from "../types";

const getUserId = async () => {
  const client = getClient();
  const { data : { user  } }  = await client.auth.getUser();
  if (!user || !user.id){
    throw new Error("User not found.");
  }
  return user.id;
}

export const getAllProducts = async () => {
  const client = getClient();
  const { data, error } = await client.from("products").select();
  if (error) throw error;
  return data;
};

export const getUser = async () => {
  const client = getClient();
  const id = await getUserId();
  const { data, error } = await client.from("users").select().eq("id", id);
  if (error) throw error;
  return data;
};

export const getStudentUsers = async () => {
  const client = getClient();
  const { data, error } = await client
    .from("users")
    .select("*") 
    .eq("is_admin", false);

  if (error) throw error;
  return data;
};

export const purchaseVouchers = async (purchase_items : CartItem[]) => {
  const client = getClient();
  const total_cost = purchase_items.reduce((acc, curr) => acc + curr.points * curr.quantity, 0);
  const { error } = await client.rpc('process_purchase', { purchase_items, total_cost });
  if (error) throw error;
}

export const getAllVouchers = async () => {
  const client = getClient();
  const { data, error } = await client.from("vouchers").select();
  if (error) throw error;
  return data;
}

export const getUserVouchers = async () => {
  const client = getClient();
  const id = getUserId();
  const { data, error } = await client.from("vouchers").select().eq("id", id);
  if (error) throw error;
  return data;
}

export const claimVoucher = async (id : string) => {
  const client = getClient();
  const { error } = await client.from("vouchers").update({claimed_on: new Date().toISOString()}).eq("id",id);
  if (error) throw error;
}

export const createProduct = async (newProduct: Product) => {
  const productObj : any = {
    name: newProduct.name,
    description: newProduct.description,
    points: newProduct.points,
    stock: newProduct.stock,
    category: newProduct.category,    
    url: newProduct.url
  }
  const client = getClient();
  const { error } = await client.from("products").insert(productObj);
  if (error) throw error;
}

export const deleteProduct = async (productId: string) => {
  const client = getClient();
  const { error } = await client.from("products").delete().eq("id", productId);
  if (error) throw error;
}

export const updateProductStock = async (productId: string, newStock: number) => {
  const client = getClient();
  const { error } = await client.from("products").update({ stock: newStock }).eq("id", productId);
  if (error) throw error;
}

export const updateUserPoints = async (userId: string, newPoints: number) => {
  const client = getClient();
  const { error } = await client.from("users").update({ points: newPoints}).eq("id", userId);
  if (error) throw error;
}

const getRowCount = async (table: string) => {
  const client = getClient();
  const {  count } = await client
  .from(table)
  .select('*', { count: 'exact', head: true })
  return count;
}

export const getProductCount = () => getRowCount('products');
export const getUserCount = () => getRowCount('users');
export const getVoucherCount = () => getRowCount('vouchers');

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