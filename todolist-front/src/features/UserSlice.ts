import { createSlice } from '@reduxjs/toolkit';
import type { user } from '../app/services/types';
import { userApi } from '../app/services/userApi';
import type { RootState } from '../app/store';

interface InitialState {
	user: user | null;
	current: user | null;
	isAuthenticated: boolean;
	token?: string | undefined;
}

const initialState: InitialState = {
	current: null,
	user: null,
	isAuthenticated: false,
};

const slice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: () => initialState,
		resetUser: state => {
			state.user = null;
		},
	},
	extraReducers: build => {
		build
			.addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
				state.token = action.payload;
				state.isAuthenticated = true;
			})
			.addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.current = action.payload;
			});
	},
});

export const { logout, resetUser } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
	state.user.isAuthenticated;
export const selectCurrent = (state: RootState) => state.user.current;
export const selectUser = (state: RootState) => state.user.user;
