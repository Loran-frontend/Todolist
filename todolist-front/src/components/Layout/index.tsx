import { Card, CardBody } from '@heroui/card';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../features/UserSlice';
import { Container } from '../container';
import { Header } from '../Header';
import { TodoList } from '../TodoList';

export const Layout = () => {
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/auth');
		}
	}, []);

	return (
		<>
			<Header />
			<Container>
				<Card>
					<CardBody className='w-[500px] h-[600px]'>
						<TodoList />
					</CardBody>
				</Card>
			</Container>
		</>
	);
};
