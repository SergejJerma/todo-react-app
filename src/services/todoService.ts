import axios from 'axios';
import { Todo } from '../types/Todo';

const API_URL = 'http://127.0.0.1:8000/todos';

export const getTodos = () => axios.get<Todo[]>(API_URL);
export const createTodo = (todo: Todo) => axios.post<Todo>(API_URL, todo);

export const updateTodo = (id: string, todo: Todo) => axios.put<Todo>(`${API_URL}/${id}`, todo);

export const deleteTodo = (id: string) => axios.delete(`${API_URL}/${id}`);

