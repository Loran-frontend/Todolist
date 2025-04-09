import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@heroui/button';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useRegisterMutation } from '../../app/services/userApi';
import { Input } from '../../components/Input';

type Inputs = {
	email: string;
	password: string;
	name: string;
};

export function Register({
	setSelected,
}: {
	setSelected: (value: string) => void;
}) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const [register, { isLoading }] = useRegisterMutation();

	const onSubmit: SubmitHandler<Inputs> = async data => {
		try {
			await register(data).unwrap;
			setSelected('login');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='flex items-center justify-center'>
			<form
				className='flex flex-col justify-center items-center'
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1 className='mx-auto text-2xl'>Register</h1>
				<Input
					name='name'
					label='name'
					required
					control={control}
					type='text'
				/>
				<ErrorMessage isError={errors.name} />
				<Input
					name='email'
					label='email'
					required
					control={control}
					type='email'
				/>
				<ErrorMessage isError={errors.email} />
				<Input
					name='password'
					label='password'
					required
					control={control}
					type='password'
				/>
				<ErrorMessage isError={errors.password} />
				<Button type='submit' isLoading={isLoading}>
					register
				</Button>
			</form>
		</div>
	);
}
