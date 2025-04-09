import { Card, CardBody } from '@heroui/card';
import { Tab, Tabs } from '@heroui/tabs';
import { useState } from 'react';
import { Login } from '../../features/Login';
import { Register } from '../../features/Register';

export function Auth() {
	const [selected, setSelected] = useState('login');

	return (
		<div className='flex items-center justify-center h-screen'>
			<div className='flex flex-col'>
				<Card className='max-w-full w-[340px] h-[400px]'>
					<CardBody className='overflow-hidden'>
						<Tabs
							fullWidth
							size='md'
							selectedKey={selected}
							onSelectionChange={key => setSelected(key as string)}
						>
							<Tab key='login' title='Login'>
								<Login />
							</Tab>
							<Tab key='sign-up' title='Register'>
								<Register setSelected={setSelected} />
							</Tab>
						</Tabs>
					</CardBody>
				</Card>
			</div>
		</div>
	);
}
