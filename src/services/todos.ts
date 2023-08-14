import { type TodoList } from '../types';

const API_URL = `https://api.jsonbin.io/v3/b/64d687d98e4aa6225ece8bef`;

interface Todo {
	id: string;
	title: string;
	completed: boolean;
	order: number;
}

const headers = {
	'Content-Type': 'application/json',
	'X-Master-Key': import.meta.env.VITE_API_KEY,
};

export const fetchTodos = async (): Promise<Todo[]> => {
	const res = await fetch(API_URL, {
		headers,
	});
	if (!res.ok) {
		console.error('Error fetching todos');
		return [];
	}
	console.log('fetching');
	const { record: todos } = (await res.json()) as { record: Todo[] };
	return todos;
};

export const updateTodos = async ({ todos }: { todos: TodoList }): Promise<boolean> => {
	const res = await fetch(API_URL, {
		method: 'PUT',
		headers,
		body: JSON.stringify(todos),
	});

	return res.ok;
};
