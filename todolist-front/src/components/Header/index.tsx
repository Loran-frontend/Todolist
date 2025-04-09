import { useAppSelector } from '@/app/hooks';
import { BASE_URL } from '@/constants';
import { Button } from '@heroui/button';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import { User } from '@heroui/react';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	logout,
	selectCurrent,
	selectIsAuthenticated,
} from '../../features/UserSlice';
import { ThemeContext } from '../themeProvider';

export const Header = () => {
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const { toggleTheme } = useContext(ThemeContext);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const hadleLogout = () => {
		dispatch(logout());
		localStorage.removeItem('token');
		navigate('/auth');
	};

	const user = useAppSelector(selectCurrent);

	return (
		<Navbar className='border-b-2 shadow-sm'>
			<NavbarBrand>
				<p className='font-bold text-inherit'>Todolist</p>
			</NavbarBrand>

			<User
				avatarProps={{
					src: `${BASE_URL}${user?.avatarUrl}`,
				}}
				name={user?.name}
				description={user?.email}
			/>

			<NavbarContent justify='end'>
				<NavbarItem className='lg:flex text-3xl cursor-pointer'>
					<Button
						color='default'
						variant='flat'
						className='gap-2'
						onPress={() => toggleTheme()}
					>
						<span>Theme</span>
					</Button>
				</NavbarItem>
				<NavbarItem>
					{isAuthenticated && (
						<Button
							color='default'
							variant='flat'
							className='gap-2'
							onPress={hadleLogout}
						>
							<span>Выйти</span>
						</Button>
					)}
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
};
