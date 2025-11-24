export type Topping = 'Cheese' | 'Pepperoni' | 'Mushrooms' | 'Onions' | 'Olives';

export interface Pizza {
  id: number;
  name: string;
  toppings: Topping[];
  fanFavorite: boolean;
  delivery: boolean;
}