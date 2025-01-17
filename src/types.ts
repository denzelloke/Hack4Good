export interface Product {
  id: string;
  name: string;
  description: string;
  points: number;
  stock: number;
  url: string;
  category: string;
  img: File | null;
}

export interface CartItem extends Product{
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

//not sure if this requires params like pw, email, role etc
export interface User {
  id: string;
  username: string;
  points: number;
}
//not sure if this requires params like pw, email, role etc

export interface ProductRequestFormData {
  name: string;
  productName: string;
  quantity: number;
  description: string;
}


export interface Voucher {
  id: string;
  user_id: string;
  product_id: string;
  points: number;
  created_at: any;
  claimed_on: any;
}

export interface AuctionItem {
  id: string;
  product_id: string;
  name: string;
  description: string;
  url: string
  currentBid: number;
  auctionEndTime: any;
}

export interface AuctionBid {
  id: string;
  product_id: string;
  user_id: string;
  points: number;
  created_at: any;
}