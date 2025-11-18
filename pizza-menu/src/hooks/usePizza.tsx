/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, type PropsWithChildren } from 'react';
import type { Pizza, Topping } from '../types/pizza';

interface PizzaContextValue {
  pizzas: Pizza[];
  addPizza: (pizza: Omit<Pizza, 'id'>) => void;
  editPizza: (id: number, updated: Omit<Pizza, 'id'>) => void;
  deletePizza: (id: number) => void;
  getPizzaById: (id: number) => Pizza | undefined;
}

const PizzaContext = createContext<PizzaContextValue | undefined>(undefined);

// Demo data
const initialPizzas: Pizza[] = [
  {
    id: 1,
    name: 'Margherita',
    toppings: ['Cheese'],
    fanFavorite: true,
    delivery: true,
  },
  {
    id: 2,
    name: 'Pepperoni Feast',
    toppings: ['Cheese', 'Pepperoni'],
    fanFavorite: true,
    delivery: false,
  },
  {
    id: 3,
    name: 'Veggie Delight',
    toppings: ['Cheese', 'Mushrooms', 'Onions', 'Olives'],
    fanFavorite: false,
    delivery: true,
  },
];

export const PizzaProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [pizzas, setPizzas] = useState<Pizza[]>(initialPizzas);
  const [nextId, setNextId] = useState<number>(initialPizzas.length + 1);

  const addPizza = (pizza: Omit<Pizza, 'id'>) => {
    setPizzas((prev) => [...prev, { ...pizza, id: nextId }]);
    setNextId((id) => id + 1);
  };

  const editPizza = (id: number, updated: Omit<Pizza, 'id'>) => {
    setPizzas((prev) =>
      prev.map((p) => (p.id === id ? { ...updated, id } : p))
    );
  };

  const deletePizza = (id: number) => {
    setPizzas((prev) => prev.filter((p) => p.id !== id));
  };

  const getPizzaById = (id: number) => pizzas.find((p) => p.id === id);

  const value: PizzaContextValue = {
    pizzas,
    addPizza,
    editPizza,
    deletePizza,
    getPizzaById,
  };

  return <PizzaContext.Provider value={value}>{children}</PizzaContext.Provider>;
};

export const usePizza = () => {
  const ctx = useContext(PizzaContext);
  if (!ctx) {
    throw new Error('usePizza must be used within a PizzaProvider');
  }
  return ctx;
};

export const ALL_TOPPINGS: Topping[] = [
  'Cheese',
  'Pepperoni',
  'Mushrooms',
  'Onions',
  'Olives',
];
