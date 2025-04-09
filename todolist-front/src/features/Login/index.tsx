import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@heroui/button';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
	useLazyCurrentQuery,
	useLoginMutation,
} from '../../app/services/userApi';
import { Input } from '../../components/Input';
type Inputs = { email: string; password: string };

export function Login() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const [login, { isLoading }] = useLoginMutation();
	const [triggerCurrentQuery] = useLazyCurrentQuery();

	const navigate = useNavigate();

	const onSubmit: SubmitHandler<Inputs> = async data => {
		try {
			await login(data).unwrap();
			await triggerCurrentQuery();
			navigate('/');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<form
				className='flex flex-col justify-center items-center'
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1 className='mx-auto text-2xl'>Login</h1>
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
					Login
				</Button>
			</form>
		</div>
	);
}
