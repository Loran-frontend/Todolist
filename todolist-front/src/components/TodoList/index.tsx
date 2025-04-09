import { useGetTodoQuery } from '@/app/services/todoApi';
import { TodoInput } from '../TodoInput';
import { TodoTask } from '../TodoTask';

export function TodoList() {
	const { data } = useGetTodoQuery();

	return (
		<div>
			<TodoInput />
			<div className='flex flex-col mt-4 gap-3'>
				{data?.map(Todo => (
					<TodoTask
						complete={Todo.complete}
						title={Todo.title}
						id={Todo.id}
						key={Todo.id}
					></TodoTask>
				))}
			</div>
		</div>
	);
}
