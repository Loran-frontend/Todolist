import {
	useDeleteTodoMutation,
	useLazyGetTodoQuery,
	useUpdateTodoMutation,
} from '@/app/services/todoApi';
import { Card, CardBody } from '@heroui/card';
import { Checkbox } from '@heroui/react';
import { useState } from 'react';
import { GoPencil, GoTrash } from 'react-icons/go';
import { TodoEditInput } from '../TodoEditInput';

type TodoTask = {
	title: string;
	complete: boolean;
	id: string;
};

export function TodoTask({ title, complete, id }: TodoTask) {
	const [edit, setEdit] = useState(false);

	const [deleteTodo] = useDeleteTodoMutation();
	const [updateTodo] = useUpdateTodoMutation();
	const [triggetTodos] = useLazyGetTodoQuery();

	async function deleteTask() {
		try {
			await deleteTodo({ id }).unwrap();
			await triggetTodos().unwrap();
		} catch (error) {
			console.error(error);
		}
	}

	async function updateTaskComplete(complete?: boolean) {
		try {
			await updateTodo({ id, complete }).unwrap();
			await triggetTodos().unwrap();
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Card className='py-2'>
			{!edit ? (
				<>
					<CardBody className='flex flex-row items-center justify-between'>
						<Checkbox
							defaultSelected={complete}
							onValueChange={isSelected => updateTaskComplete(isSelected)}
							lineThrough
						>
							{title}
						</Checkbox>
						<div className='flex gap-2'>
							<GoPencil
								className='hover:text-default-400 transition-colors cursor-pointer'
								onClick={() => setEdit(edit => !edit)}
							/>
							<GoTrash
								className='hover:text-default-400 transition-colors cursor-pointer'
								onClick={deleteTask}
							/>
						</div>
					</CardBody>
				</>
			) : (
				<TodoEditInput id={id} title={title} setEdit={setEdit} />
			)}
		</Card>
	);
}
