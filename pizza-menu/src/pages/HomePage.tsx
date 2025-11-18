import React from 'react';
import { Link } from 'react-router-dom';
import PizzaTable from '../components/PizzaTable';
import { usePizza } from '../hooks/usePizza';

const HomePage: React.FC = () => {
  const { pizzas } = usePizza();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Pizza Menu</h2>
        {/* Link styled as Bootstrap button */}
        <Link to="/add-pizza" className="btn btn-success">
          + Add Pizza
        </Link>
      </div>

      <PizzaTable pizzas={pizzas} />
    </div>
  );
};

export default HomePage;
