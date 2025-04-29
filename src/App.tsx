import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos, createTodo, updateTodo, deleteTodo } from './services/todoService';
import { v4 as uuidv4 } from 'uuid';
import './index.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await getTodos();
    setTodos(response.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (editingTodoId) {
      await updateTodo(editingTodoId, { id: editingTodoId, title, description });
      setEditingTodoId(null);
    } else {
      await createTodo({ id: uuidv4(), title, description });
    }
  
    setTitle('');
    setDescription('');
    fetchTodos();
  };
  
  const handleEdit = (todo: Todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditingTodoId(todo.id);
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          style={{ width: '100%', marginBottom: 10 }}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          style={{ width: '100%', marginBottom: 10 }}
        />
        <button type="submit" className={`button ${editingTodoId ? 'button-update' : 'button-add'}`}>
          {editingTodoId ? 'Update Todo' : 'Add Todo'}
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: 10, border: '1px solid #ccc', padding: 10 }}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <button onClick={() => handleEdit(todo)} className="button button-edit">Edit</button>
            <button onClick={() => handleDelete(todo.id)} className="button button-delete">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
