// defines what the backend can do - describes its behavior
require('./database/db');
const express = require('express');
const app = express(); // creates the backend application object

const restaurantRoutes = require('./routes/restaurantRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const dishRoutes = require('./routes/dishRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const voucherRoutes = require('./routes/voucherRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({status: 'OK'});
})

// restaurants
app.use('/restaurants', restaurantRoutes); // send any request starting with /restaurants (prefix) to restaurantRoutes
app.use('/restaurants', categoryRoutes);
app.use('/restaurants', dishRoutes);
app.use('/restaurants', reviewRoutes);

// orders
app.use('/orders', orderRoutes);

// reviews
app.use('/reviews', reviewRoutes);

// vouchers
app.use('/vouchers', voucherRoutes);

// authentication
app.use('/auth', authRoutes);

// user
app.use('/users', userRoutes);


module.exports = app; // allows other files to use this backend definition

