export interface Product {
  id: string;
  title: string;
  img: string;
  points: number;
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
