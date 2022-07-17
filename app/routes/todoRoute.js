const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

router.route('/')
        .post(todoController.createTodo)
        .get(todoController.allTodos);

router.route('/:id')
        .patch(todoController.updateTodo)
        .delete(todoController.deleteTodo);

module.exports = router;