const express = require('express');
const sendEmail = require('./utils/email');

const todoRouter = require('./app/routes/todoRoute');

const app = express();

// For body request parsing
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Chat App Engine is now running',
        time: new Date(Date.now()),
        // RequestTime: new Date().toISOString(),
    });
});

app.use('/api/v1/todo', todoRouter);

app.post('/api/v1/sendmail', async (req, res) => {

    try {
        // Send email
        const email = await sendEmail({
            subject: `New Todo Created`,
            message: 'Check your portal, a new todo item has been created',     
        });
        
        res.status(200).json({
            status: 'success',
            message: 'Mail sent'
        });
          
    } catch (error) {
        const err = error;
        res.status(500).json({
            status: 'fail',
            err
        });
    }
    
})

module.exports = app;