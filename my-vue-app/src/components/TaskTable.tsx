// src/components/TaskTable.tsx
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';
// Import types separately with 'type' keyword
import type { ColumnDef, SortingState } from '@tanstack/react-table';

// Define what a Task looks like
type Task = {
  id: number;
  title: string;
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
  dueDate: string;
};

const TaskTable = () => {
  // Our simple state - no database needed!
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Learn React Router', priority: 'High', completed: true, dueDate: '2024-01-15' },
    { id: 2, title: 'Practice TanStack Table', priority: 'High', completed: false, dueDate: '2024-01-20' },
    { id: 3, title: 'Master React Hook Form', priority: 'Medium', completed: false, dueDate: '2024-01-25' },
    { id: 4, title: 'Build a project', priority: 'Low', completed: false, dueDate: '2024-02-01' },
    { id: 5, title: 'Read React docs', priority: 'Medium', completed: true, dueDate: '2024-01-10' },
  ]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  // Function to toggle task completion - memoized to fix dependency warning
  const toggleTask = useCallback((id: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []); // Empty array since we're using the function form of setTasks

  // Define our columns
  const columns = useMemo<ColumnDef<Task>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'title',
        header: 'Task Title',
        cell: info => (
          <span style={{ fontWeight: 'bold' }}>
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        cell: info => {
          const priority = info.getValue() as string;
          const colors: Record<string, string> = {
            Low: '#27ae60',
            Medium: '#f39c12',
            High: '#e74c3c'
          };
          return (
            <span style={{
              padding: '4px 8px',
              backgroundColor: colors[priority],
              color: 'white',
              borderRadius: '4px',
              fontSize: '12px'
            }}>
              {priority}
            </span>
          );
        },
      },
      {
        accessorKey: 'completed',
        header: 'Status',
        cell: info => {
          const task = info.row.original;
          return (
            <button
              onClick={() => toggleTask(task.id)}
              style={{
                padding: '4px 8px',
                backgroundColor: task.completed ? '#27ae60' : '#95a5a6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {task.completed ? '✅ Done' : '⏳ Pending'}
            </button>
          );
        },
      },
      {
        accessorKey: 'dueDate',
        header: 'Due Date',
        cell: info => new Date(info.getValue() as string).toLocaleDateString(),
      },
    ],
    [toggleTask] // Now toggleTask is properly memoized and included as dependency
  );

  // Create the table instance
  const table = useReactTable({
    data: tasks,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1>📝 My Task Manager</h1>
      
      {/* Search Box */}
      <div style={{ marginBottom: '20px' }}>
        <input
          value={globalFilter ?? ''}
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder="🔍 Search tasks..."
          style={{
            padding: '10px',
            width: '300px',
            fontSize: '16px',
            border: '2px solid #3498db',
            borderRadius: '5px'
          }}
        />
        <span style={{ marginLeft: '10px', color: '#666' }}>
          Try searching: "High", "Done", or "React"
        </span>
      </div>

      {/* Stats */}
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <div>Total Tasks: {tasks.length}</div>
        <div>Completed: {tasks.filter(t => t.completed).length}</div>
        <div>Pending: {tasks.filter(t => !t.completed).length}</div>
      </div>

      {/* The Table */}
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{
                    padding: '12px',
                    backgroundColor: '#34495e',
                    color: 'white',
                    cursor: 'pointer',
                    userSelect: 'none',
                    position: 'relative',
                    textAlign: 'left'
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {/* Sorting indicator */}
                  <span style={{ marginLeft: '5px' }}>
                    {{
                      asc: '⬆️',
                      desc: '⬇️',
                    }[header.column.getIsSorted() as string] ?? '↕️'}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} style={{ borderBottom: '1px solid #ecf0f1' }}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} style={{ padding: '12px' }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Instructions */}
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#e3f2fd',
        borderRadius: '8px' 
      }}>
        <h3>💡 Try These:</h3>
        <ul>
          <li>Click any column header to sort</li>
          <li>Click again to reverse sort</li>
          <li>Search for "High" to filter high priority tasks</li>
          <li>Click status buttons to toggle completion</li>
        </ul>
      </div>

      {/* Debug Info */}
      <div style={{
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#f5f5f5',
        borderRadius: '5px',
        fontSize: '12px',
        color: '#666'
      }}>
        <strong>Debug Info:</strong><br/>
        Sorting: {sorting.length > 0 ? `${sorting[0].id} (${sorting[0].desc ? 'desc' : 'asc'})` : 'none'}<br/>
        Filter: {globalFilter || 'none'}<br/>
        Visible Rows: {table.getRowModel().rows.length} / {tasks.length}
      </div>
    </div>
  );
};

export default TaskTable;