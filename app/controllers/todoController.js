const Todo = require('../models/todoModel');
const sendEmail = require('../../utils/email');

module.exports = {
    createTodo: async (req, res) => {
        try {
            const todo = await Todo.create(req.body);

            res.status(201).json({
                status: 'success',
                data: {
                    todo
                }
            });

            // Send email
            await sendEmail({
                subject: `New Todo Created`,
                message: 'Check your portal, a new todo item has been created',     
            });

        } catch (error) {
            const err = error;
            res.status(500).json({
                status: 'fail',
                data: {
                    err
                }
            });
        }
        
    },

    updateTodo: async (req, res) => {
        try {
            const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })

            if (!todo) {
                res.status(404).json({
                    status: 'error',
                    message: 'Todo not found',
                });
            }

            res.status(200).json({
                status: 'success',
                data: {
                    todo
                }
            });
        } catch (error) {
            const err = error;
            res.status(500).json({
                status: 'fail',
                data: {
                    err
                }
            });
        }
    },

    deleteTodo: async (req, res) => {

        try {
            const todo = await Todo.findByIdAndDelete(req.params.id);

            if (!todo) {
                res.status(404).json({
                    status: 'error',
                    message: 'Todo not found',
                });
            }

            // No content will be displayed on postman(API Client)
            res.status(204).json({
                status: 'success',
                data: null
            });
        } catch (error) {
            const err = error;
            res.status(500).json({
                status: 'fail',
                data: {
                    err
                }
            });
        }
        
    },

    allTodos: async(req, res) => {
        try {
            const { limit = 5, page = 1 } = req.body;
            const todos = await Todo.find()
                                    .sort({
                                        createdAt: 'desc',
                                    })
                                    .limit(limit * 1)
                                    .skip((page - 1) * limit);
            
            const count = await Todo.countDocuments();

            res.status(200).json({
                status: 'success',
                message: 'All Todos retrieved',
                data: {
                    todos,
                    meta: {
                        total: Math.ceil(count / limit),
                        page: parseInt(page),
                    }
                }
            });

        } catch (error) {
            const err = error;
            res.status(500).json({
                status: 'fail',
                data: {
                    err
                }
            });
        }
    }

}