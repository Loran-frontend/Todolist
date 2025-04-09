import {
	useCreateTodoMutation,
	useLazyGetTodoQuery,
} from '@/app/services/todoApi';
import { Button } from '@heroui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../Input';

type Inputs = {
	title: string;
};

export function TodoInput() {
	const { control, handleSubmit, setValue } = useForm<Inputs>();
	const [createTodo] = useCreateTodoMutation();
	const [triggetTodos] = useLazyGetTodoQuery();

	const onSubmit: SubmitHandler<Inputs> = async data => {
		try {
			await createTodo(data).unwrap();
			setValue('title', '');
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
				label='New Task'
				size='lg'
				required
				endContent={
					<Button type='submit' size='sm' color='primary'>
						Send
					</Button>
				}
			/>
		</form>
	);
}
