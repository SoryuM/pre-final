export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}