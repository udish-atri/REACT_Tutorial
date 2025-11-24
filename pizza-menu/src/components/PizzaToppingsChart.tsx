import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ALL_TOPPINGS, usePizza } from '../hooks/usePizza';

// Color per topping
const TOPPING_COLORS: Record<string, string> = {
  Cheese: "#FFA600",
  Pepperoni: "#FF6361",
  Mushrooms: "#BC5090",
  Onions: "#58508D",
  Olives: "#003F5C",
};

interface ChartDataItem {
  topping: string;
  count: number;
}

const PizzaToppingsChart: React.FC = () => {
  const { pizzas } = usePizza();

  const data: ChartDataItem[] = ALL_TOPPINGS.map((topping) => ({
    topping,
    count: pizzas.filter((p) => p.toppings.includes(topping)).length,
  }));

  // Avoid empty chart container (when no pizzas exist)
  if (pizzas.length === 0) {
    return <p>No data yet. Add some pizzas!</p>;
  }

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="topping" />
          <YAxis allowDecimals={false} />
          <Tooltip />

          {/* Add Legend */}
          <Legend />

          <Bar dataKey="count" name="Number of Pizzas">
            {data.map((entry) => (
              <Cell
                key={entry.topping}
                fill={TOPPING_COLORS[entry.topping]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PizzaToppingsChart;
