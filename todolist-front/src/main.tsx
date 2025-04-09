import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './app/store';
import { Layout } from './components/Layout';
import { ThemeProvider } from './components/themeProvider';
import { AuthGuard } from './features/authGuard';
import './index.css';
import { Auth } from './pages/auth';

const container = document.getElementById('root');

const router = createBrowserRouter([
	{
		path: '/auth',
		element: <Auth />,
	},
	{
		path: '/',
		element: <Layout />,
	},
]);

if (container) {
	const root = createRoot(container);

	root.render(
		<React.StrictMode>
			<Provider store={store}>
				<AuthGuard>
					<ThemeProvider>
						<RouterProvider router={router} />
					</ThemeProvider>
				</AuthGuard>
			</Provider>
		</React.StrictMode>
	);
} else {
	throw new Error(
		"Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
	);
}
