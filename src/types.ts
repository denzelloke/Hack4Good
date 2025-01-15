export interface Product {
  id: string;
  name: string;
  description: string;
  img: string;
  points: number;
  stock: number;
  category: string;
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
  price: number;
  is_expired: boolean;
  created_at: any;
  expired_at: any;
}