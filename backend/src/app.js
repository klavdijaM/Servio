// defines what the backend can do - describes its behavior
require('./database/db');
const express = require('express');
const app = express(); // creates the backend application object
const restaurantRoutes = require('./routes/restaurantRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({status: 'OK'});
})

app.use('/restaurants', restaurantRoutes); // send any request starting with /restaurants (prefix) to restaurantRoutes
app.use('/restaurants', categoryRoutes);

module.exports = app; // allows other files to use this backend definition

