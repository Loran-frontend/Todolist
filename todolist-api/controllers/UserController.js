const bcrypt = require('bcryptjs');
const { prisma } = require('../prisma/prisma-client');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const jdenticon = require('jdenticon');

const UserController = {
	registerUser: async (req, res) => {
		const { email, password, name } = req.body;

		if (!password | !name | !email) {
			return res.status(400).json('not password or name or email');
		}
		try {
			const existingUser = await prisma.user.findUnique({ where: { email } });
			if (existingUser) {
				return res.status(400).json('Пользователь уже существует');
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			const png = jdenticon.toPng(`${name}${Date.now()}`, 200);
			const AvatarName = `${name}_${Date.now()}.png`;
			const AvatarPath = path.join(__dirname, '../uploads', AvatarName);
			fs.writeFileSync(AvatarPath, png);

			const user = await prisma.user.create({
				data: {
					email: email,
					password: hashedPassword,
					name: name,
					avatarUrl: `/uploads/${AvatarName}`,
				},
			});
			res.json(user);
		} catch (error) {
			console.error('register error', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},
	loginUser: async (req, res) => {
		const { email, password } = req.body;

		try {
			const user = await prisma.user.findUnique({ where: { email } });
			if (!user) {
				return res.status(400).json('Неверный логин или пароль');
			}

			const valid = await bcrypt.compare(password, user.password);

			if (!valid) {
				return res.status(400).json('Неверный логин или пароль');
			}

			const token = jwt.sign({ userId: user.id }, process.env.TOKEN_KEY);

			res.json(token);
		} catch (error) {
			console.error('login error', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},
	current: async (req, res) => {
		try {
			const user = await prisma.user.findUnique({
				where: { id: req.user.userId },
				include: {
					todos: true,
				},
			});

			if (!user) {
				return res.status(400).json({ error: 'Не удалось найти пользователя' });
			}

			return res.status(200).json(user);
		} catch (error) {
			console.log('err', error);
			res.status(500).json({ error: 'Что-то пошло не так' });
		}
	},
};

module.exports = UserController;
