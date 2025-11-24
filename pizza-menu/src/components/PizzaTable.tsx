

import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { Pizza } from '../types/pizza';

interface Props {
  pizzas: Pizza[];
}

const PizzaTable: React.FC<Props> = ({ pizzas }) => {
  const columns = React.useMemo<ColumnDef<Pizza>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
        cell: (info) => {
          const id = info.getValue<number>();
          return <Link to={`/${id}`}>{id}</Link>;
        },
      },
      {
        header: 'Pizza',
        accessorKey: 'name',
      },
      {
        header: 'Toppings',
        accessorKey: 'toppings',
        cell: (info) => {
          const toppings = info.getValue<string[]>();
          return toppings.join(', ');
        },
      },
      {
        header: 'Fan Favorite',
        accessorKey: 'fanFavorite',
        cell: (info) => (info.getValue<boolean>() ? 'Yes' : 'No'),
      },
      {
        header: 'Delivery',
        accessorKey: 'delivery',
        cell: (info) => (info.getValue<boolean>() ? 'Yes' : 'No'),
      },
    ],
    []
  );

  const table = useReactTable({
    data: pizzas,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

 return (
    <Table striped bordered hover responsive>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} data-cy="pizza-row">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PizzaTable;
