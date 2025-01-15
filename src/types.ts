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

export interface ProductRequestFormData {
  name: string;
  productName: string;
  quantity: number;
  description: string;
}
