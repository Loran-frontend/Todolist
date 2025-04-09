const { prisma } = require('../prisma/prisma-client');

const TodosController = {
	addTodo: async (req, res) => {
		const { title } = req.body;
		const userId = req.user.userId;

		if (!title) {
			res.status(400).json({ error: 'Все поля обязательны' });
		}

		try {
			const todo = await prisma.todo.create({
				data: {
					title,
					userId,
				},
			});

			res.json(todo);
		} catch (error) {
			console.error('todo create error', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},
	getTodos: async (req, res) => {
		const userId = req.user.userId;

		try {
			const todos = await prisma.todo.findMany({ where: { userId } });
			res.json(todos);
		} catch (error) {
			console.error('todo get error', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},
	updateTodos: async (req, res) => {
		const { id } = req.params;
		const { title, complete } = req.body;

		if (!title && complete === undefined) {
			res.status(400).json({ error: 'Заполните хотя бы 1 поле' });
		}

		try {
			const exitingTodo = await prisma.todo.findUnique({ where: { id } });

			if (!exitingTodo) {
				res.status(404).json({ error: 'Такой задачи нету' });
			}

			if (exitingTodo.userId !== req.user.userId) {
				return res.status(403).json({ error: 'Нет доступа' });
			}

			const updateTodo = await prisma.todo.update({
				where: { id },
				data: {
					title,
					complete: complete,
				},
			});
			res.json(updateTodo);
		} catch (error) {
			console.error('todo update error', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},
	deleteTodos: async (req, res) => {
		const { id } = req.params;

		try {
			const exitingTodo = await prisma.todo.findUnique({ where: { id } });

			if (!exitingTodo) {
				res.status(404).json({ error: 'Такой задачи нету' });
			}

			if (exitingTodo.userId !== req.user.userId) {
				return res.status(403).json({ error: 'Нет доступа' });
			}

			await prisma.todo.delete({
				where: { id },
			});
			res.json(exitingTodo);
		} catch (error) {
			console.error('todo delete error', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},
};

module.exports = TodosController;
