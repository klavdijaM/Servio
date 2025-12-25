// defines what the backend can do - describes its behavior

const restaurants = [
    {
        id: 1,
        name: 'Pizza Palace',
        cuisine: 'Italian',
        deliveryTime: 30
    },
    {
        id: 2,
        name: 'Sushi World',
        cuisine: 'Japanese',
        deliveryTime: 45
    },
    {
        id: 3,
        name: 'Burger House',
        cuisine: 'American',
        deliveryTime: 25
    }
];


const express = require('express'); //
const app = express(); // creates the backend application object
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({status: 'OK'});
})

app.get('/restaurants', (req, res) => {
    res.json(restaurants);
})

module.exports = app; // allows other files to use this backend definition

