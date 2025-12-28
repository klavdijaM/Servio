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

// ********
// CATEGORIES
// ********
const categories = [
    // 1. Trattoria Roma (Italian)
    { restaurant_id: 1, name: 'Starters' },
    { restaurant_id: 1, name: 'Salads' },
    { restaurant_id: 1, name: 'Pizza' },
    { restaurant_id: 1, name: 'Pasta' },
    { restaurant_id: 1, name: 'Meat & Fish' },
    { restaurant_id: 1, name: 'Desserts' },
    { restaurant_id: 1, name: 'Drinks' },

    // 2. Wiener Stube (Austrian)
    { restaurant_id: 2, name: 'Soups' },
    { restaurant_id: 2, name: 'Starters' },
    { restaurant_id: 2, name: 'Main Dishes' },
    { restaurant_id: 2, name: 'Schnitzel' },
    { restaurant_id: 2, name: 'Desserts' },
    { restaurant_id: 2, name: 'Drinks' },

    // 3. Green Bowl (Vegetarian)
    { restaurant_id: 3, name: 'Bowls' },
    { restaurant_id: 3, name: 'Salads' },
    { restaurant_id: 3, name: 'Warm Dishes' },
    { restaurant_id: 3, name: 'Desserts' },
    { restaurant_id: 3, name: 'Drinks' },

    // 4. Sakura Central (Japanese)
    { restaurant_id: 4, name: 'Soups' },
    { restaurant_id: 4, name: 'Starters' },
    { restaurant_id: 4, name: 'Sushi' },
    { restaurant_id: 4, name: 'Noodles' },
    { restaurant_id: 4, name: 'Rice Dishes' },
    { restaurant_id: 4, name: 'Desserts' },
    { restaurant_id: 4, name: 'Drinks' },

    // 5. Burger Werk (Burgers)
    { restaurant_id: 5, name: 'Burgers' },
    { restaurant_id: 5, name: 'Sides' },
    { restaurant_id: 5, name: 'Desserts' },
    { restaurant_id: 5, name: 'Drinks' },

    // 6. Bombay Spice (Indian)
    { restaurant_id: 6, name: 'Soups' },
    { restaurant_id: 6, name: 'Starters' },
    { restaurant_id: 6, name: 'Curries' },
    { restaurant_id: 6, name: 'Rice Dishes' },
    { restaurant_id: 6, name: 'Specials' },
    { restaurant_id: 6, name: 'Desserts' },
    { restaurant_id: 6, name: 'Drinks' },

    // 7. Pizza Nord (Italian)
    { restaurant_id: 7, name: 'Starters' },
    { restaurant_id: 7, name: 'Pizza' },
    { restaurant_id: 7, name: 'Pasta' },
    { restaurant_id: 7, name: 'Desserts' },
    { restaurant_id: 7, name: 'Drinks' },

    // 8. Asia Wok Express (Asian)
    { restaurant_id: 8, name: 'Soups' },
    { restaurant_id: 8, name: 'Starters' },
    { restaurant_id: 8, name: 'Noodles' },
    { restaurant_id: 8, name: 'Rice Dishes' },
    { restaurant_id: 8, name: 'Specials' },
    { restaurant_id: 8, name: 'Desserts' },
    { restaurant_id: 8, name: 'Drinks' },

    // 9. Anatolia Kebap (Kebab)
    { restaurant_id: 9, name: 'Kebap' },
    { restaurant_id: 9, name: 'Wraps' },
    { restaurant_id: 9, name: 'Plates' },
    { restaurant_id: 9, name: 'Sides' },
    { restaurant_id: 9, name: 'Drinks' },

    // 10. Schnitzel Haus (Austrian)
    { restaurant_id: 10, name: 'Soups' },
    { restaurant_id: 10, name: 'Main Dishes' },
    { restaurant_id: 10, name: 'Schnitzel' },
    { restaurant_id: 10, name: 'Desserts' },
    { restaurant_id: 10, name: 'Drinks' },

    // 11. Pho Saigon (Asian)
    { restaurant_id: 11, name: 'Soups' },
    { restaurant_id: 11, name: 'Starters' },
    { restaurant_id: 11, name: 'Pho' },
    { restaurant_id: 11, name: 'Rice Dishes' },
    { restaurant_id: 11, name: 'Specials' },
    { restaurant_id: 11, name: 'Desserts' },
    { restaurant_id: 11, name: 'Drinks' },

    // 12. Veggie South (Vegetarian)
    { restaurant_id: 12, name: 'Bowls' },
    { restaurant_id: 12, name: 'Salads' },
    { restaurant_id: 12, name: 'Warm Dishes' },
    { restaurant_id: 12, name: 'Desserts' },
    { restaurant_id: 12, name: 'Drinks' },

    // 13. Istanbul Grill (Kebab)
    { restaurant_id: 13, name: 'Kebap' },
    { restaurant_id: 13, name: 'Wraps' },
    { restaurant_id: 13, name: 'Plates' },
    { restaurant_id: 13, name: 'Sides' },
    { restaurant_id: 13, name: 'Drinks' },

    // 14. Factory Bites (Fast Food)
    { restaurant_id: 14, name: 'Fast Food' },
    { restaurant_id: 14, name: 'Sides' },
    { restaurant_id: 14, name: 'Desserts' },
    { restaurant_id: 14, name: 'Drinks' },

    // 15. Grill Station (Burgers)
    { restaurant_id: 15, name: 'Grill' },
    { restaurant_id: 15, name: 'Sides' },
    { restaurant_id: 15, name: 'Desserts' },
    { restaurant_id: 15, name: 'Drinks' },

    // 16. Pasta Depot (Italian)
    { restaurant_id: 16, name: 'Starters' },
    { restaurant_id: 16, name: 'Pasta' },
    { restaurant_id: 16, name: 'Salads' },
    { restaurant_id: 16, name: 'Desserts' },
    { restaurant_id: 16, name: 'Drinks' },

    // 17. Curry Factory (Indian)
    { restaurant_id: 17, name: 'Soups' },
    { restaurant_id: 17, name: 'Starters' },
    { restaurant_id: 17, name: 'Curries' },
    { restaurant_id: 17, name: 'Rice Dishes' },
    { restaurant_id: 17, name: 'Specials' },
    { restaurant_id: 17, name: 'Desserts' },
    { restaurant_id: 17, name: 'Drinks' }
];

const insertCategoryQuery = `
INSERT INTO categories (restaurant_id, name)
VALUES (?, ?)`

categories.forEach(category => {
    db.run(
        insertCategoryQuery,
        [category.restaurant_id, category.name],
        (err) => {
            if (err) {
                console.error('Failed to insert category', err);
            }
        }
    );
});
console.log('Categories seeded');


