import React from 'react';
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

  const pizza = getPizzaById(id);

  if (!pizza) {
    return <Alert variant="danger">Pizza not found.</Alert>;
  }

  const handleSubmit = (values: PizzaFormValues) => {
    editPizza(id, {
      name: values.name,
      toppings: values.toppings as Topping[],
      fanFavorite: values.fanFavorite === 'yes',
      delivery: values.delivery === 'yes',
    });
    navigate('/');
  };

  const handleDelete = () => {
    deletePizza(id);
    navigate('/');
  };

  return (
    <div>
      <h2>Edit Pizza #{id}</h2>
      <PizzaForm
        initialValues={pizza}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        submitLabel="Save Changes"
      />
    </div>
  );
};

export default EditPizzaPage;
