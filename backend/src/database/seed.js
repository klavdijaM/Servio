// inserts predefined data into the database using the schema
const db = require('./db'); // connect to database

// ********
// DELIVERY ZONES
// ********

const deliveryZones = [
    {name: 'Central', base_delivery_time: 20},
    {name: 'North', base_delivery_time: 30},
    {name: 'South', base_delivery_time: 40},
    {name: 'Industrial', base_delivery_time: 50},
]

const insertDeliveryZoneQuery = `
INSERT INTO delivery_zones (name, base_delivery_time) -- inserts cols name and base_delivery_time into the row delivery_zones 
VALUES (?, ?)`;

deliveryZones.forEach(zone => {
    db.run(
        insertDeliveryZoneQuery,
        [zone.name, zone.base_delivery_time],
        (err) => {
            if (err) {
                console.error('Failed to insert delivery zone', err);
            }
        });
});
console.log('Delivery zones seeded');

// ********
// RESTAURANTS
// ********

const restaurants = [
    { name: 'Trattoria Roma', cuisine: 'Italian', delivery_zone_id: 1 },
    { name: 'Wiener Stube', cuisine: 'Austrian', delivery_zone_id: 1 },
    { name: 'Green Bowl', cuisine: 'Vegetarian', delivery_zone_id: 1 },
    { name: 'Sakura Central', cuisine: 'Japanese', delivery_zone_id: 1 },

    { name: 'Burger Werk', cuisine: 'Burgers', delivery_zone_id: 2 },
    { name: 'Bombay Spice', cuisine: 'Indian', delivery_zone_id: 2 },
    { name: 'Pizza Nord', cuisine: 'Italian', delivery_zone_id: 2 },
    { name: 'Asia Wok Express', cuisine: 'Asian', delivery_zone_id: 2 },
    { name: 'Anatolia Kebap', cuisine: 'Kebab', delivery_zone_id: 2 },

    { name: 'Schnitzel Haus', cuisine: 'Austrian', delivery_zone_id: 3 },
    { name: 'Pho Saigon', cuisine: 'Asian', delivery_zone_id: 3 },
    { name: 'Veggie South', cuisine: 'Vegetarian', delivery_zone_id: 3 },
    { name: 'Istanbul Grill', cuisine: 'Kebab', delivery_zone_id: 3 },

    { name: 'Factory Bites', cuisine: 'Fast Food', delivery_zone_id: 4 },
    { name: 'Grill Station', cuisine: 'Burgers', delivery_zone_id: 4 },
    { name: 'Pasta Depot', cuisine: 'Italian', delivery_zone_id: 4 },
    { name: 'Curry Factory', cuisine: 'Indian', delivery_zone_id: 4 }
];

const insertRestaurantQuery = `
INSERT INTO restaurants (name, cuisine, delivery_zone_id) 
VALUES (?, ?, ?)`;

restaurants.forEach(restaurant => {
    db.run(
        insertDeliveryZoneQuery,
        [restaurant.name, restaurant.cuisine, restaurant.delivery_zone_id],
        (err) => {
            if (err) {
                console.error('Failed to insert restaurant', err);
            }
        }
    );
});
console.log('Restaurants seeded');