import { Api } from './Api';
import { user } from './types';

export const userApi = Api.injectEndpoints({
	endpoints: build => ({
		login: build.mutation<string, { email: string; password: string }>({
			query: userData => ({
				url: 'user/login',
				method: 'POST',
				body: userData,
			}),
		}),
		register: build.mutation<
			{ email: string; password: string; name: string },
			{ email: string; password: string; name: string }
		>({
			query: userData => ({
				url: 'user/register',
				method: 'POST',
				body: userData,
			}),
		}),
		current: build.query<user, void>({
			query: () => ({
				url: 'user/current',
				method: 'GET',
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useCurrentQuery,
	useLazyCurrentQuery,
} = userApi;
export const {
	endpoints: { login, register },
} = userApi;
