import React from 'react';

type Props = {
	children: React.ReactElement[] | React.ReactElement;
};

export function Container({ children }: Props) {
	return (
		<div className='flex h-full max-w-screen-xl mx-auto mt-10 justify-center'>
			{children}
		</div>
	);
}
