// defines what the backend can do - describes its behavior
const express = require('express');
const app = express(); // creates the backend application
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({status: 'OK'});
})

module.exports = app;

