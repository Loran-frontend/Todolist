import { FieldError } from 'react-hook-form';

export function ErrorMessage({ isError }: { isError: FieldError | undefined }) {
	if (isError) {
		return (
			<span className='mx-auto mb-1 text-tiny text-red-600'>
				This field is required
			</span>
		);
	}
}
