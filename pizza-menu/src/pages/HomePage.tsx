import React from 'react';
import { Link } from 'react-router-dom';
import PizzaTable from '../components/PizzaTable';
import PizzaToppingsChart from '../components/PizzaToppingsChart';
import { usePizza } from '../hooks/usePizza';

const HomePage: React.FC = () => {
  const { pizzas, loading, error } = usePizza();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Pizza Menu</h2>

        <Link to="/add-pizza" className="btn btn-success">
          + Add Pizza
        </Link>
      </div>

      {loading && <p>Loading pizzas...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* Chart section */}
      <div className="mb-4">
        <h4>Pizza Toppings Overview</h4>
        <PizzaToppingsChart />
      </div>

      {/* Table */}
      {!loading && <PizzaTable pizzas={pizzas} />}
    </div>
  );
};

export default HomePage;
