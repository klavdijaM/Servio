// handles responses when requests come in
const restaurants = [
    { id: 1, name: 'Pizza Palace', cuisine: 'Italian', deliveryTime: 30 },
    { id: 2, name: 'Sushi World', cuisine: 'Japanese', deliveryTime: 45 },
    { id: 3, name: 'Burger House', cuisine: 'American', deliveryTime: 25 }
];

function getRestaurants(req, res) {
    res.json(restaurants);
}

module.exports = { getRestaurants }; 