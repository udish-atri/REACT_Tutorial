import React from 'react';
import { useNavigate } from 'react-router-dom';
import PizzaForm, { type PizzaFormValues } from '../components/PizzaForm';
import { usePizza } from '../hooks/usePizza';
import type { Topping } from '../types/pizza';

const AddPizzaPage: React.FC = () => {
  const { addPizza } = usePizza();
  const navigate = useNavigate();

  const handleSubmit = (values: PizzaFormValues) => {
    addPizza({
      name: values.name,
      toppings: values.toppings as Topping[],
      fanFavorite: values.fanFavorite === 'yes',
      delivery: values.delivery === 'yes',
    });

    navigate('/');
  };

  return (
    <div>
      <h2>Add Pizza</h2>
      <PizzaForm onSubmit={handleSubmit} submitLabel="Add Pizza" />
    </div>
  );
};

export default AddPizzaPage;
