import { Api } from './Api';
import type { Todo } from './types';

export const todoApi = Api.injectEndpoints({
	endpoints: build => ({
		createTodo: build.mutation<Todo, { title: string }>({
			query: todoData => ({
				url: 'todos',
				method: 'POST',
				body: todoData,
			}),
		}),
		updateTodo: build.mutation<
			Todo,
			{ title?: string; complete?: boolean; id: string }
		>({
			query: ({ title, complete, id }) => ({
				url: `todos/${id}`,
				method: 'PUT',
				body: { title, complete },
			}),
		}),
		deleteTodo: build.mutation<Todo, { id: string }>({
			query: ({ id }) => ({
				url: `todos/${id}`,
				method: 'DELETE',
			}),
		}),
		getTodo: build.query<Todo[], void>({
			query: () => ({
				url: 'todos',
				method: 'GET',
			}),
		}),
	}),
});

export const {
	useCreateTodoMutation,
	useDeleteTodoMutation,
	useGetTodoQuery,
	useLazyGetTodoQuery,
	useUpdateTodoMutation,
} = todoApi;

export const {
	endpoints: { createTodo, getTodo, updateTodo, deleteTodo },
} = todoApi;
