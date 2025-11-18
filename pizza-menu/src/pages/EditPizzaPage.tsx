import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import PizzaForm, { type PizzaFormValues } from '../components/PizzaForm';
import { usePizza } from '../hooks/usePizza';
import type { Topping } from '../types/pizza';

const EditPizzaPage: React.FC = () => {
  const { pizzaId } = useParams<{ pizzaId: string }>();
  const id = Number(pizzaId);
  const navigate = useNavigate();
  const { getPizzaById, editPizza, deletePizza } = usePizza();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pizza = getPizzaById(id);

  if (!pizza) {
    return <Alert variant="danger">Pizza not found.</Alert>;
  }

  const handleSubmit = async (values: PizzaFormValues) => {
    try {
      setIsSubmitting(true);
      await editPizza(id, {
        name: values.name,
        toppings: values.toppings as Topping[],
        fanFavorite: values.fanFavorite === 'yes',
        delivery: values.delivery === 'yes',
      });
      navigate('/');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsSubmitting(true);
      await deletePizza(id);
      navigate('/');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Edit Pizza #{id}</h2>
      <PizzaForm
        initialValues={pizza}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        submitLabel="Save Changes"
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EditPizzaPage;
