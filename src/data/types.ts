export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  categoryId: number;
  image: string;
  rating: { rate: number; count: number };
};
export type ProductTypes = ProductType[];

export type CategoryType = {
  id: number;
  categoryTitle: string;
};
export type CategoryTypes = CategoryType[];

export type CartType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  categoryId: number;
  image: string;
  cartPrice: number,
  amount: number
};
export type CartTypes = CartType[];
