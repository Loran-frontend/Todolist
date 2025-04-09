const express = require('express');
const authenticateToken = require('../Middleware/auth');
const UserController = require('../controllers/UserController');
const TodosController = require('../controllers/TodosController');
const router = express.Router();

console.log(`Cервер запущен на ${process.env.PORT} порту`);

// роуты пользователей
router.post('/user/register', UserController.registerUser);
router.post('/user/login', UserController.loginUser);
router.get('/user/current', authenticateToken, UserController.current);

// роуты списка дел
router.post('/todos', authenticateToken, TodosController.addTodo);
router.get('/todos', authenticateToken, TodosController.getTodos);
router.put('/todos/:id', authenticateToken, TodosController.updateTodos);
router.delete('/todos/:id', authenticateToken, TodosController.deleteTodos);

module.exports = router;
