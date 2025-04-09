export type user = {
	id: string;
	email: string;
	password: string;
	name: string;
	avatarUrl: string;
	createdAt: Date;
	updatedAt: Date;
	todos: Todo[];
};

export type Todo = {
	id: string;
	title: string;
	complete: boolean;
	createdAt: Date;
	updatedAt: Date;
	User: user;
	userId: string;
};
