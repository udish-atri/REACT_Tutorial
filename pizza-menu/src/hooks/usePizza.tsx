/* eslint-disable react-refresh/only-export-components */

import axios from 'axios';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import type { Pizza, Topping } from '../types/pizza';

interface PizzaContextValue {
  pizzas: Pizza[];
  loading: boolean;
  error: string | null;
  addPizza: (pizza: Omit<Pizza, 'id'>) => Promise<void>;
  editPizza: (id: number, updated: Omit<Pizza, 'id'>) => Promise<void>;
  deletePizza: (id: number) => Promise<void>;
  getPizzaById: (id: number) => Pizza | undefined;
}

const PizzaContext = createContext<PizzaContextValue | undefined>(undefined);

// json-server base URL
const API_URL = 'http://localhost:3001';

export const PizzaProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load pizzas from json-server when app starts
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get<Pizza[]>(`${API_URL}/pizzas`);
        setPizzas(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load pizzas');
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  const addPizza = async (pizza: Omit<Pizza, 'id'>) => {
    try {
      const res = await axios.post<Pizza>(`${API_URL}/pizzas`, pizza);
      setPizzas((prev) => [...prev, res.data]);
    } catch (err) {
      console.error(err);
      setError('Failed to add pizza');
    }
  };

  const editPizza = async (id: number, updated: Omit<Pizza, 'id'>) => {
    try {
      const res = await axios.put<Pizza>(`${API_URL}/pizzas/${id}`, updated);
      setPizzas((prev) =>
        prev.map((p) => (p.id === id ? res.data : p))
      );
    } catch (err) {
      console.error(err);
      setError('Failed to edit pizza');
    }
  };

  const deletePizza = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/pizzas/${id}`);
      setPizzas((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete pizza');
    }
  };

  const getPizzaById = (id: number) => pizzas.find((p) => p.id === id);

  const value: PizzaContextValue = {
    pizzas,
    loading,
    error,
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
