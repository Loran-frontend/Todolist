import { Input as InputHeroi } from '@heroui/input';
import type { HTMLInputTypeAttribute } from 'react';
import React from 'react';
import { useController, type Control } from 'react-hook-form';

interface IInput {
	type?: HTMLInputTypeAttribute;
	label?: string;
	name: string;
	placeholder?: string;
	required?: boolean;
	control: Control<any>;
	size?: 'sm' | 'md' | 'lg' | undefined;
	endContent?: React.ReactNode;
	className?: string;
}

export function Input({
	required,
	control,
	name,
	label,
	type,
	placeholder,
	size,
	endContent,
	className,
}: IInput) {
	const { field } = useController({
		name,
		control,
		rules: {
			required,
		},
	});

	return (
		<div className='mx-auto max-w-xs'>
			<div>
				<label
					htmlFor={name}
					className='mb-1 block text-sm font-medium text-gray-700'
				>
					{label}
				</label>
				<InputHeroi
					type={type}
					id={name}
					placeholder={placeholder}
					value={field.value}
					name={field.name}
					onChange={field.onChange}
					onBlur={field.onBlur}
					size={size}
					endContent={endContent}
					className={className}
				/>
			</div>
		</div>
	);
}
