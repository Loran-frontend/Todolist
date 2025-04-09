import { configureStore } from '@reduxjs/toolkit';
import user from '../features/UserSlice';
import { listenerMiddleware } from '../middleware/auth';
import { Api } from './services/Api';

export const store = configureStore({
	reducer: {
		[Api.reducerPath]: Api.reducer,
		user,
	},
	middleware: getDefaulyMiddlewere =>
		getDefaulyMiddlewere()
			.concat(Api.middleware)
			.prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
