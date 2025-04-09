import {
	useLazyGetTodoQuery,
	useUpdateTodoMutation,
} from '@/app/services/todoApi';
import { Button } from '@heroui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../Input';

type Inputs = {
	title: string;
};

type TodoEditInput = {
	id: string;
	title: string;
	setEdit: (arg: boolean) => void;
};

export function TodoEditInput({ id, title, setEdit }: TodoEditInput) {
	const { control, handleSubmit, setValue } = useForm<Inputs>();
	const [editTodo] = useUpdateTodoMutation();
	const [triggetTodos] = useLazyGetTodoQuery();

	setValue('title', title);

	const onSubmit: SubmitHandler<Inputs> = async ({ title }) => {
		try {
			await editTodo({ id, title }).unwrap();
			setEdit(false);
			await triggetTodos().unwrap();
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input
				control={control}
				name='title'
				type='text'
				size='md'
				required
				endContent={
					<Button type='submit' size='sm' color='primary'>
						Edit
					</Button>
				}
			/>
		</form>
	);
}
