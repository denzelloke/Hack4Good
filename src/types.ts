export interface Product {
  id: string;
  name: string;
  description: string;
  img: string;
  points: number;
  stock: number;
  category: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPoints: number;
}

export interface User {
  id: string;
  username: string;
  points: number;
}
//not sure if this requires params like pw, email, role etc

export interface Voucher {
  id: number;
  user_id: number;
  product_id: number;
  price: number;
  is_expired: boolean;
  created_at: any;
  expired_at: any;
}