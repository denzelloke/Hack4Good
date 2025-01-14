export interface Product {
  id: string;
  name: string;
  description: string;
  img: string;
  price: number;
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

