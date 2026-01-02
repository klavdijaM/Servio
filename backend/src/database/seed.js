// inserts predefined data into the database using the schema
const db = require('./db'); // connect to database
db.run('PRAGMA foreign_keys = ON'); // enforces defined foreign key rules

db.serialize(() => { // executes SQL commands in order, no skipping ahead while waiting

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
        {name: 'Trattoria Roma', cuisine: 'Italian', delivery_zone_id: 1},
        {name: 'Wiener Stube', cuisine: 'Austrian', delivery_zone_id: 1},
        {name: 'Green Bowl', cuisine: 'Vegetarian', delivery_zone_id: 1},
        {name: 'Sakura Central', cuisine: 'Japanese', delivery_zone_id: 1},

        {name: 'Burger Werk', cuisine: 'Burgers', delivery_zone_id: 2},
        {name: 'Bombay Spice', cuisine: 'Indian', delivery_zone_id: 2},
        {name: 'Pizza Nord', cuisine: 'Italian', delivery_zone_id: 2},
        {name: 'Asia Wok Express', cuisine: 'Asian', delivery_zone_id: 2},
        {name: 'Anatolia Kebap', cuisine: 'Kebab', delivery_zone_id: 2},

        {name: 'Schnitzel Haus', cuisine: 'Austrian', delivery_zone_id: 3},
        {name: 'Pho Saigon', cuisine: 'Asian', delivery_zone_id: 3},
        {name: 'Veggie South', cuisine: 'Vegetarian', delivery_zone_id: 3},
        {name: 'Istanbul Grill', cuisine: 'Kebab', delivery_zone_id: 3},

        {name: 'Factory Bites', cuisine: 'Fast Food', delivery_zone_id: 4},
        {name: 'Grill Station', cuisine: 'Burgers', delivery_zone_id: 4},
        {name: 'Pasta Depot', cuisine: 'Italian', delivery_zone_id: 4},
        {name: 'Curry Factory', cuisine: 'Indian', delivery_zone_id: 4}
    ];

    const insertRestaurantQuery = `
        INSERT INTO restaurants (name, cuisine, delivery_zone_id)
        VALUES (?, ?, ?)`;

    restaurants.forEach(restaurant => {
        db.run(
            insertRestaurantQuery,
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
        {restaurant_id: 1, name: 'Starters'},
        {restaurant_id: 1, name: 'Salads'},
        {restaurant_id: 1, name: 'Pizza'},
        {restaurant_id: 1, name: 'Pasta'},
        {restaurant_id: 1, name: 'Meat'},
        {restaurant_id: 1, name: 'Fish'},
        {restaurant_id: 1, name: 'Desserts'},
        {restaurant_id: 1, name: 'Drinks'},

        // 2. Wiener Stube (Austrian)
        {restaurant_id: 2, name: 'Soups'},
        {restaurant_id: 2, name: 'Starters'},
        {restaurant_id: 2, name: 'Main Dishes'},
        {restaurant_id: 2, name: 'Schnitzel'},
        {restaurant_id: 2, name: 'Desserts'},
        {restaurant_id: 2, name: 'Drinks'},

        // 3. Green Bowl (Vegetarian)
        {restaurant_id: 3, name: 'Bowls'},
        {restaurant_id: 3, name: 'Salads'},
        {restaurant_id: 3, name: 'Warm Dishes'},
        {restaurant_id: 3, name: 'Desserts'},
        {restaurant_id: 3, name: 'Drinks'},

        // 4. Sakura Central (Japanese)
        {restaurant_id: 4, name: 'Soups'},
        {restaurant_id: 4, name: 'Starters'},
        {restaurant_id: 4, name: 'Sushi'},
        {restaurant_id: 4, name: 'Noodles'},
        {restaurant_id: 4, name: 'Rice Dishes'},
        {restaurant_id: 4, name: 'Desserts'},
        {restaurant_id: 4, name: 'Drinks'},

        // 5. Burger Werk (Burgers)
        {restaurant_id: 5, name: 'Burgers'},
        {restaurant_id: 5, name: 'Sides'},
        {restaurant_id: 5, name: 'Desserts'},
        {restaurant_id: 5, name: 'Drinks'},

        // 6. Bombay Spice (Indian)
        {restaurant_id: 6, name: 'Soups'},
        {restaurant_id: 6, name: 'Starters'},
        {restaurant_id: 6, name: 'Curries'},
        {restaurant_id: 6, name: 'Rice Dishes'},
        {restaurant_id: 6, name: 'Specials'},
        {restaurant_id: 6, name: 'Desserts'},
        {restaurant_id: 6, name: 'Drinks'},

        // 7. Pizza Nord (Italian)
        {restaurant_id: 7, name: 'Starters'},
        {restaurant_id: 7, name: 'Pizza'},
        {restaurant_id: 7, name: 'Pasta'},
        {restaurant_id: 7, name: 'Desserts'},
        {restaurant_id: 7, name: 'Drinks'},

        // 8. Asia Wok Express (Asian)
        {restaurant_id: 8, name: 'Soups'},
        {restaurant_id: 8, name: 'Starters'},
        {restaurant_id: 8, name: 'Noodles'},
        {restaurant_id: 8, name: 'Rice Dishes'},
        {restaurant_id: 8, name: 'Specials'},
        {restaurant_id: 8, name: 'Desserts'},
        {restaurant_id: 8, name: 'Drinks'},

        // 9. Anatolia Kebap (Kebab)
        {restaurant_id: 9, name: 'Kebap'},
        {restaurant_id: 9, name: 'Wraps'},
        {restaurant_id: 9, name: 'Plates'},
        {restaurant_id: 9, name: 'Sides'},
        {restaurant_id: 9, name: 'Drinks'},

        // 10. Schnitzel Haus (Austrian)
        {restaurant_id: 10, name: 'Soups'},
        {restaurant_id: 10, name: 'Main Dishes'},
        {restaurant_id: 10, name: 'Schnitzel'},
        {restaurant_id: 10, name: 'Desserts'},
        {restaurant_id: 10, name: 'Drinks'},

        // 11. Pho Saigon (Asian)
        {restaurant_id: 11, name: 'Soups'},
        {restaurant_id: 11, name: 'Starters'},
        {restaurant_id: 11, name: 'Pho'},
        {restaurant_id: 11, name: 'Rice Dishes'},
        {restaurant_id: 11, name: 'Specials'},
        {restaurant_id: 11, name: 'Desserts'},
        {restaurant_id: 11, name: 'Drinks'},

        // 12. Veggie South (Vegetarian)
        {restaurant_id: 12, name: 'Bowls'},
        {restaurant_id: 12, name: 'Salads'},
        {restaurant_id: 12, name: 'Warm Dishes'},
        {restaurant_id: 12, name: 'Desserts'},
        {restaurant_id: 12, name: 'Drinks'},

        // 13. Istanbul Grill (Kebab)
        {restaurant_id: 13, name: 'Kebap'},
        {restaurant_id: 13, name: 'Wraps'},
        {restaurant_id: 13, name: 'Plates'},
        {restaurant_id: 13, name: 'Sides'},
        {restaurant_id: 13, name: 'Drinks'},

        // 14. Factory Bites (Fast Food)
        {restaurant_id: 14, name: 'Fast Food'},
        {restaurant_id: 14, name: 'Sides'},
        {restaurant_id: 14, name: 'Desserts'},
        {restaurant_id: 14, name: 'Drinks'},

        // 15. Grill Station (Burgers)
        {restaurant_id: 15, name: 'Grill'},
        {restaurant_id: 15, name: 'Sides'},
        {restaurant_id: 15, name: 'Desserts'},
        {restaurant_id: 15, name: 'Drinks'},

        // 16. Pasta Depot (Italian)
        {restaurant_id: 16, name: 'Starters'},
        {restaurant_id: 16, name: 'Pasta'},
        {restaurant_id: 16, name: 'Salads'},
        {restaurant_id: 16, name: 'Desserts'},
        {restaurant_id: 16, name: 'Drinks'},

        // 17. Curry Factory (Indian)
        {restaurant_id: 17, name: 'Soups'},
        {restaurant_id: 17, name: 'Starters'},
        {restaurant_id: 17, name: 'Curries'},
        {restaurant_id: 17, name: 'Rice Dishes'},
        {restaurant_id: 17, name: 'Specials'},
        {restaurant_id: 17, name: 'Desserts'},
        {restaurant_id: 17, name: 'Drinks'}
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

// ********
// DISHES
// ********

    function insertDishes(categoryId, dishes) {
        const insertDishesQuery = `
            INSERT INTO dishes (category_id, name, description, price)
            VALUES (?, ?, ?, ?)`;

        dishes.forEach(dish => {
            db.run(
                insertDishesQuery,
                [categoryId, dish.name, dish.description, dish.price],
                (err) => {
                    if (err) {
                        console.error('Failed to insert dish', err);
                    }
                }
            );
        });
    }

// **** 1. Trattoria Roma (Italian) **** //

// Starters
    insertDishes(1, [
        {name: 'Bruschetta al Pomodoro', description: 'Grilled bread with tomato, garlic, basil', price: 6.50},
        {name: 'Garlic Bread', description: 'Toasted bread with garlic butter', price: 5.90},
        {name: 'Antipasto Misto', description: 'Italian cold cuts, cheese, olives', price: 9.90}
    ]);

// Salads
    insertDishes(2, [
        {name: 'Caprese Salad', description: 'Mozzarella, tomato, basil, olive oil', price: 8.50},
        {name: 'Mixed Green Salad', description: 'Seasonal greens with house dressing', price: 6.90}
    ]);

// Pizza
    insertDishes(3, [
        {name: 'Margherita', description: 'Tomato sauce, mozzarella, basil', price: 9.90},
        {name: 'Salami', description: 'Tomato sauce, mozzarella, salami', price: 11.50},
        {name: 'Diavola', description: 'Spicy salami, chili, mozzarella', price: 12.50},
        {name: 'Quattro Formaggi', description: 'Mozzarella, gorgonzola, parmesan, taleggio', price: 12.90}
    ]);

// Pasta
    insertDishes(4, [
        {name: 'Spaghetti Carbonara', description: 'Egg, pancetta, parmesan', price: 12.50},
        {name: 'Penne Arrabbiata', description: 'Tomato sauce, chili, garlic', price: 10.90},
        {name: 'Tagliatelle Bolognese', description: 'Slow-cooked beef ragù', price: 13.50},
        {name: 'Lasagna al Forno', description: 'Layered pasta with meat sauce and béchamel', price: 13.90}
    ]);

// Meat
    insertDishes(5, [
        {name: 'Grilled Chicken Breast', description: 'Served with roasted vegetables', price: 14.90},
        {name: 'Veal Scaloppine al Limone', description: 'Veal in lemon butter sauce', price: 17.50},
        {name: 'Beef Tagliata', description: 'Grilled beef slices with arugula and parmesan', price: 19.90}
    ]);

// Fish
    insertDishes(6, [
        {name: 'Gilthead Seabream', description: 'Grilled seabream with lemon and herbs', price: 18.90},
        {name: 'Grilled Calamari', description: 'Calamari with garlic, olive oil, and lemon', price: 16.50},
        {name: 'Mussels in White Wine', description: 'Mussels cooked in white wine and garlic', price: 15.90}
    ]);

// Desserts
    insertDishes(7, [
        {name: 'Tiramisu', description: 'Classic Italian coffee dessert', price: 6.50},
        {name: 'Panna Cotta', description: 'Vanilla cream with berry sauce', price: 6.90},
        {name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with liquid center', price: 7.50}
    ]);

// Drinks
    insertDishes(8, [
        {name: 'Mineral Water', description: 'Still or sparkling', price: 3.50},
        {name: 'Coca-Cola', description: '0.33l bottle', price: 3.90},
        {name: 'House Red Wine', description: '0.2l glass', price: 4.90},
        {name: 'House White Wine', description: '0.2l glass', price: 4.90}
    ]);


// **** 2. Wiener Stube (Austrian) **** //

// Soups
    insertDishes(9, [
        {name: 'Beef Soup with Noodles', description: 'Clear beef broth with fine noodles', price: 5.90},
        {name: 'Goulash Soup', description: 'Hearty beef soup with paprika', price: 6.90},
        {name: 'Cream of Pumpkin Soup', description: 'Pumpkin soup with cream', price: 5.50}
    ]);

// Starters
    insertDishes(10, [
        {name: 'Cheese Dumplings', description: 'Fried cheese dumplings with salad', price: 7.90},
        {name: 'Viennese Potato Salad', description: 'Potato salad with vinegar dressing', price: 4.90}
    ]);

// Main Dishes
    insertDishes(11, [
        {name: 'Boiled Beef (Tafelspitz)', description: 'Boiled beef with horseradish and potatoes', price: 16.90},
        {name: 'Viennese Goulash', description: 'Beef goulash with bread dumpling', price: 14.90},
        {name: 'Roast Pork', description: 'Roast pork with sauerkraut and dumpling', price: 15.50}
    ]);

// Schnitzel
    insertDishes(12, [
        {name: 'Viennese Schnitzel', description: 'Breaded veal schnitzel with potatoes', price: 19.90},
        {name: 'Pork Schnitzel', description: 'Breaded pork schnitzel with fries', price: 15.90},
        {name: 'Chicken Schnitzel', description: 'Breaded chicken schnitzel with salad', price: 14.90}
    ]);

// Desserts
    insertDishes(13, [
        {name: 'Apple Strudel', description: 'Apple pastry with vanilla sauce', price: 6.50},
        {name: 'Kaiserschmarrn', description: 'Shredded pancake with plum compote', price: 7.90},
        {name: 'Sachertorte', description: 'Chocolate cake with apricot jam', price: 6.90}
    ]);

// Drinks
    insertDishes(14, [
        {name: 'Mineral Water', description: 'Still or sparkling', price: 3.50},
        {name: 'Apple Juice', description: 'Natural apple juice', price: 3.90},
        {name: 'Beer', description: '0.5l Austrian beer', price: 4.50},
        {name: 'Spritzer', description: 'White wine with sparkling water', price: 4.90}
    ]);


// **** 3. Green Bowl (Vegetarian) **** //

// Bowls
    insertDishes(15, [
        {name: 'Quinoa Power Bowl', description: 'Quinoa, roasted vegetables, hummus', price: 11.90},
        {name: 'Avocado Buddha Bowl', description: 'Avocado, chickpeas, brown rice, tahini', price: 12.50},
        {name: 'Falafel Bowl', description: 'Falafel, couscous, salad, yogurt sauce', price: 11.50}
    ]);

// Salads
    insertDishes(16, [
        {name: 'Green Garden Salad', description: 'Mixed greens, cucumber, seeds', price: 8.90},
        {name: 'Goat Cheese Salad', description: 'Goat cheese, walnuts, honey dressing', price: 10.90}
    ]);

// Warm Dishes
    insertDishes(17, [
        {name: 'Vegetable Curry', description: 'Seasonal vegetables in coconut curry', price: 12.90},
        {name: 'Spinach Lasagna', description: 'Vegetarian lasagna with spinach and ricotta', price: 13.50},
        {name: 'Stuffed Bell Peppers', description: 'Peppers filled with rice and vegetables', price: 11.90}
    ]);

// Desserts
    insertDishes(18, [
        {name: 'Vegan Chocolate Cake', description: 'Dark chocolate cake without dairy', price: 5.90},
        {name: 'Chia Pudding', description: 'Chia seeds with coconut milk and berries', price: 5.50}
    ]);

// Drinks
    insertDishes(19, [
        {name: 'Homemade Lemonade', description: 'Fresh lemon and mint', price: 4.50},
        {name: 'Ginger Tea', description: 'Fresh ginger infusion', price: 3.90},
        {name: 'Oat Milk Latte', description: 'Coffee with oat milk', price: 4.20}
    ]);


// **** 4. Sakura Central (Japanese) **** //

// Soups
    insertDishes(20, [
        {name: 'Miso Soup', description: 'Soybean paste soup with tofu and spring onions', price: 4.50},
        {name: 'Spicy Miso Soup', description: 'Miso soup with chili oil and vegetables', price: 5.00},
        {name: 'Ramen Broth', description: 'Rich pork-based ramen broth', price: 6.00}
    ]);

// Starters
    insertDishes(21, [
        {name: 'Edamame', description: 'Steamed soybeans with sea salt', price: 5.00},
        {name: 'Gyoza', description: 'Pan-fried dumplings filled with pork and vegetables', price: 7.50},
        {name: 'Seaweed Salad', description: 'Marinated seaweed with sesame dressing', price: 6.50}
    ]);

// Sushi
    insertDishes(22, [
        {name: 'California Roll', description: 'Crab, avocado and cucumber roll', price: 9.50},
        {name: 'Salmon Nigiri', description: 'Fresh salmon over seasoned sushi rice', price: 10.50},
        {name: 'Tuna Nigiri', description: 'Raw tuna over sushi rice', price: 11.00},
        {name: 'Dragon Roll', description: 'Eel, cucumber and avocado topped with teriyaki sauce', price: 13.50}
    ]);

// Noodles
    insertDishes(23, [
        {name: 'Chicken Ramen', description: 'Ramen noodles with chicken, egg and vegetables', price: 12.50},
        {name: 'Tonkotsu Ramen', description: 'Pork bone broth with chashu pork', price: 14.00},
        {name: 'Udon Noodles', description: 'Thick wheat noodles in light soy broth', price: 11.50}
    ]);

// Rice Dishes
    insertDishes(24, [
        {name: 'Chicken Teriyaki', description: 'Grilled chicken with teriyaki sauce and rice', price: 13.00},
        {name: 'Beef Donburi', description: 'Sliced beef and onions over steamed rice', price: 14.50},
        {name: 'Vegetable Donburi', description: 'Seasonal vegetables over rice with soy glaze', price: 11.50}
    ]);

// Desserts
    insertDishes(25, [
        {name: 'Mochi Ice Cream', description: 'Rice cake filled with ice cream', price: 5.50},
        {name: 'Matcha Cheesecake', description: 'Green tea flavored cheesecake', price: 6.50}
    ]);

// Drinks
    insertDishes(26, [
        {name: 'Green Tea', description: 'Traditional hot Japanese green tea', price: 3.00},
        {name: 'Ramune Soda', description: 'Classic Japanese marble soda', price: 4.00},
        {name: 'Asahi Beer', description: 'Japanese lager beer', price: 5.00}
    ]);


// **** 5. Burger Werk (Burgers) **** //

// Burgers
    insertDishes(27, [
        {name: 'Classic Cheeseburger', description: 'Beef patty, cheddar, lettuce, tomato, burger sauce', price: 10.50},
        {name: 'Bacon BBQ Burger', description: 'Beef patty, crispy bacon, BBQ sauce, onion rings', price: 12.50},
        {name: 'Double Smash Burger', description: 'Two smashed beef patties, double cheese, pickles', price: 14.00},
        {name: 'Veggie Burger', description: 'Plant-based patty, avocado, lettuce, vegan sauce', price: 11.50}
    ]);

// Sides
    insertDishes(28, [
        {name: 'French Fries', description: 'Crispy golden fries', price: 4.00},
        {name: 'Sweet Potato Fries', description: 'Sweet potato fries with chipotle dip', price: 5.00},
        {name: 'Onion Rings', description: 'Beer-battered onion rings', price: 5.50}
    ]);

// Desserts
    insertDishes(29, [
        {name: 'Chocolate Brownie', description: 'Warm brownie with chocolate sauce', price: 5.50},
        {name: 'Milkshake Vanilla', description: 'Creamy vanilla milkshake', price: 4.50},
        {name: 'Milkshake Chocolate', description: 'Chocolate milkshake with whipped cream', price: 4.50}
    ]);

// Drinks
    insertDishes(30, [
        {name: 'Cola', description: 'Chilled soft drink', price: 3.00},
        {name: 'Lemonade', description: 'Fresh sparkling lemonade', price: 3.50},
        {name: 'Craft Beer', description: 'Local craft lager', price: 5.50}
    ]);


// **** 6. Bombay Spice (Indian) **** //

// Soups
    insertDishes(31, [
        {name: 'Lentil Soup', description: 'Spiced red lentil soup with herbs', price: 5.50},
        {name: 'Tomato Shorba', description: 'Indian-style tomato soup with cumin', price: 5.00}
    ]);

// Starters
    insertDishes(32, [
        {name: 'Vegetable Samosa', description: 'Crispy pastry filled with spiced vegetables', price: 6.00},
        {name: 'Chicken Pakora', description: 'Deep-fried spiced chicken fritters', price: 7.50},
        {name: 'Paneer Tikka', description: 'Grilled marinated paneer cubes', price: 8.00}
    ]);

// Curries
    insertDishes(33, [
        {name: 'Chicken Tikka Masala', description: 'Creamy tomato curry with grilled chicken', price: 13.50},
        {name: 'Butter Chicken', description: 'Mild buttery curry with tender chicken', price: 14.00},
        {name: 'Palak Paneer', description: 'Spinach curry with fresh paneer cheese', price: 12.50},
        {name: 'Lamb Rogan Josh', description: 'Slow-cooked lamb curry with aromatic spices', price: 15.50}
    ]);

// Rice Dishes
    insertDishes(34, [
        {name: 'Basmati Rice', description: 'Steamed basmati rice', price: 4.00},
        {name: 'Vegetable Biryani', description: 'Spiced rice with mixed vegetables', price: 11.50},
        {name: 'Chicken Biryani', description: 'Fragrant rice with spiced chicken', price: 13.00}
    ]);

// Specials
    insertDishes(35, [
        {name: 'Tandoori Chicken', description: 'Clay oven roasted chicken with spices', price: 15.00},
        {name: 'Mixed Grill Platter', description: 'Selection of tandoori meats', price: 18.50}
    ]);

// Desserts
    insertDishes(36, [
        {name: 'Gulab Jamun', description: 'Milk dumplings in sugar syrup', price: 5.50},
        {name: 'Mango Kulfi', description: 'Traditional Indian mango ice cream', price: 6.00}
    ]);

// Drinks
    insertDishes(37, [
        {name: 'Mango Lassi', description: 'Sweet yogurt drink with mango', price: 4.50},
        {name: 'Masala Chai', description: 'Spiced Indian tea with milk', price: 3.50},
        {name: 'Mineral Water', description: 'Still or sparkling', price: 2.50}
    ]);


// **** 7. Pizza Nord (Italian) **** //

// Starters
    insertDishes(38, [
        {name: 'Bruschetta Classica', description: 'Grilled bread with tomatoes, garlic and basil', price: 6.50},
        {name: 'Garlic Bread', description: 'Oven-baked bread with garlic butter', price: 5.00},
        {name: 'Antipasto Plate', description: 'Selection of Italian cold cuts and cheese', price: 9.50}
    ]);

// Pizza
    insertDishes(39, [
        {name: 'Pizza Margherita', description: 'Tomato sauce, mozzarella, fresh basil', price: 9.50},
        {name: 'Pizza Salami', description: 'Tomato sauce, mozzarella, spicy salami', price: 11.50},
        {name: 'Pizza Prosciutto', description: 'Tomato sauce, mozzarella, cooked ham', price: 11.00},
        {name: 'Pizza Quattro Formaggi', description: 'Mozzarella, gorgonzola, parmesan, emmental', price: 12.50},
        {name: 'Pizza Diavola', description: 'Spicy salami, chili, tomato sauce, mozzarella', price: 12.00}
    ]);

// Pasta
    insertDishes(40, [
        {name: 'Spaghetti Bolognese', description: 'Classic beef ragù with parmesan', price: 11.50},
        {name: 'Penne Arrabbiata', description: 'Spicy tomato sauce with garlic and chili', price: 10.50},
        {name: 'Tagliatelle Carbonara', description: 'Creamy sauce with bacon and parmesan', price: 12.00},
        {name: 'Spaghetti Vongole', description: 'Spaghetti with clams, white wine, garlic and parsley', price: 14.50}
    ]);

// Desserts
    insertDishes(41, [
        {name: 'Tiramisu', description: 'Classic Italian dessert with espresso and mascarpone', price: 6.50},
        {name: 'Panna Cotta', description: 'Vanilla cream dessert with berry sauce', price: 6.00}
    ]);

// Drinks
    insertDishes(42, [
        {name: 'Cola', description: 'Chilled soft drink', price: 3.00},
        {name: 'Sparkling Water', description: 'Italian mineral water', price: 3.50},
        {name: 'Red Wine (0.2l)', description: 'House Italian red wine', price: 5.50}
    ]);


// **** 8. Asia Wok Express (Asian) **** //

// Soups
    insertDishes(43, [
        {name: 'Miso Soup', description: 'Light soybean soup with tofu and spring onions', price: 4.50},
        {name: 'Hot & Sour Soup', description: 'Spicy and sour soup with vegetables', price: 5.00},
        {name: 'Chicken Wonton Soup', description: 'Clear broth with chicken wontons', price: 5.50}
    ]);

// Starters
    insertDishes(44, [
        {name: 'Spring Rolls', description: 'Crispy vegetable spring rolls', price: 5.50},
        {name: 'Chicken Satay', description: 'Grilled chicken skewers with peanut sauce', price: 7.50},
        {name: 'Edamame', description: 'Steamed soybeans with sea salt', price: 4.50}
    ]);

// Noodles
    insertDishes(45, [
        {name: 'Chicken Noodles', description: 'Wok-fried noodles with chicken and vegetables', price: 11.00},
        {name: 'Vegetable Noodles', description: 'Wok-fried noodles with seasonal vegetables', price: 10.00},
        {name: 'Beef Udon', description: 'Thick udon noodles with beef and soy sauce', price: 12.50},
        {name: 'Shrimp Pad Thai', description: 'Rice noodles with shrimp, peanuts and tamarind sauce', price: 13.50}
    ]);

// Rice Dishes
    insertDishes(46, [
        {name: 'Chicken Fried Rice', description: 'Fried rice with chicken and egg', price: 10.50},
        {name: 'Vegetable Fried Rice', description: 'Fried rice with mixed vegetables', price: 9.50},
        {name: 'Beef Teriyaki Rice', description: 'Grilled beef with teriyaki sauce and rice', price: 13.00}
    ]);

// Specials
    insertDishes(47, [
        {name: 'Sweet & Sour Chicken', description: 'Crispy chicken in sweet and sour sauce', price: 12.00},
        {name: 'Kung Pao Chicken', description: 'Spicy chicken with peanuts and vegetables', price: 12.50},
        {name: 'Thai Green Curry', description: 'Coconut curry with vegetables and jasmine rice', price: 13.50}
    ]);

// Desserts
    insertDishes(48, [
        {name: 'Mango Sticky Rice', description: 'Sweet sticky rice with mango and coconut milk', price: 6.50},
        {name: 'Fried Banana', description: 'Crispy fried banana with honey', price: 5.50}
    ]);

// Drinks
    insertDishes(49, [
        {name: 'Jasmine Tea', description: 'Traditional hot jasmine tea', price: 3.00},
        {name: 'Lychee Juice', description: 'Sweet lychee fruit drink', price: 3.50},
        {name: 'Coconut Water', description: 'Natural coconut water', price: 4.00}
    ]);


// **** 9. Anatolia Kebap (Kebab) **** //

// Kebap
    insertDishes(50, [
        {name: 'Chicken Döner', description: 'Marinated chicken döner meat', price: 9.00},
        {name: 'Beef Döner', description: 'Spiced beef döner meat', price: 9.50},
        {name: 'Mixed Döner', description: 'Chicken and beef döner meat', price: 10.00}
    ]);

// Wraps
    insertDishes(51, [
        {name: 'Chicken Döner Wrap', description: 'Chicken döner in flatbread with salad and sauce', price: 7.50},
        {name: 'Beef Döner Wrap', description: 'Beef döner in flatbread with vegetables', price: 8.00},
        {name: 'Falafel Wrap', description: 'Falafel with hummus and fresh vegetables', price: 7.00}
    ]);

// Plates
    insertDishes(52, [
        {name: 'Chicken Döner Plate', description: 'Chicken döner with rice, salad and sauce', price: 12.50},
        {name: 'Beef Döner Plate', description: 'Beef döner with fries and salad', price: 13.00},
        {name: 'Köfte Plate', description: 'Grilled beef köfte with rice and vegetables', price: 14.00}
    ]);

// Sides
    insertDishes(53, [
        {name: 'French Fries', description: 'Crispy fries', price: 4.00},
        {name: 'Rice', description: 'Seasoned Turkish rice', price: 3.50},
        {name: 'Mixed Salad', description: 'Fresh salad with lemon dressing', price: 4.50}
    ]);

// Drinks
    insertDishes(54, [
        {name: 'Ayran', description: 'Traditional yogurt drink', price: 3.00},
        {name: 'Cola', description: 'Chilled soft drink', price: 3.00},
        {name: 'Mineral Water', description: 'Still or sparkling water', price: 2.50}
    ]);


// **** 10. Schnitzel Haus (Austrian) **** //

// Soups
    insertDishes(55, [
        {name: 'Beef Broth with Pancake Strips', description: 'Clear beef soup with sliced pancakes', price: 5.50},
        {name: 'Goulash Soup', description: 'Hearty beef goulash soup with paprika', price: 6.50}
    ]);

// Main Dishes
    insertDishes(56, [
        {name: 'Tafelspitz', description: 'Boiled beef with apple-horseradish and potatoes', price: 16.50},
        {name: 'Zwiebelrostbraten', description: 'Roast beef with fried onions and gravy', price: 17.00},
        {name: 'Käsespätzle', description: 'Cheese spaetzle with crispy onions', price: 13.50}
    ]);

// Schnitzel
    insertDishes(57, [
        {name: 'Wiener Schnitzel', description: 'Breaded veal schnitzel with parsley potatoes', price: 19.50},
        {name: 'Pork Schnitzel', description: 'Breaded pork schnitzel with fries', price: 14.50},
        {name: 'Chicken Schnitzel', description: 'Breaded chicken schnitzel with rice', price: 15.00}
    ]);

// Desserts
    insertDishes(58, [
        {name: 'Apple Strudel', description: 'Traditional apple strudel with vanilla sauce', price: 6.50},
        {name: 'Kaiserschmarrn', description: 'Fluffy shredded pancake with plum compote', price: 7.50}
    ]);

// Drinks
    insertDishes(59, [
        {name: 'Almdudler', description: 'Austrian herbal lemonade', price: 3.50},
        {name: 'Beer (0.5l)', description: 'Austrian lager beer', price: 5.00},
        {name: 'Mineral Water', description: 'Still or sparkling water', price: 2.50}
    ]);


// **** 11. Pho Saigon (Asian) **** //

// Soups
    insertDishes(60, [
        {name: 'Tom Yum Soup', description: 'Spicy and sour soup with herbs and vegetables', price: 6.00},
        {name: 'Chicken Clear Soup', description: 'Light broth with chicken and spring onions', price: 5.50}
    ]);

// Starters
    insertDishes(61, [
        {name: 'Fresh Summer Rolls', description: 'Rice paper rolls with vegetables and herbs', price: 6.50},
        {name: 'Crispy Spring Rolls', description: 'Fried rolls filled with meat and vegetables', price: 6.00},
        {name: 'Vietnamese Dumplings', description: 'Steamed dumplings with pork filling', price: 7.00}
    ]);

// Pho
    insertDishes(62, [
        {name: 'Pho Bo', description: 'Beef noodle soup with herbs and rice noodles', price: 13.00},
        {name: 'Pho Ga', description: 'Chicken noodle soup with aromatic broth', price: 12.50},
        {name: 'Vegetarian Pho', description: 'Vegetable broth with tofu and rice noodles', price: 11.50}
    ]);

// Rice Dishes
    insertDishes(63, [
        {
            name: 'Grilled Chicken with Rice',
            description: 'Marinated grilled chicken served with jasmine rice',
            price: 12.50
        },
        {name: 'Beef Lemongrass Rice', description: 'Stir-fried beef with lemongrass and rice', price: 13.50}
    ]);

// Specials
    insertDishes(64, [
        {name: 'Bun Cha', description: 'Grilled pork with vermicelli noodles and herbs', price: 14.00},
        {name: 'Caramelized Fish', description: 'Fish fillet in caramelized sauce with rice', price: 15.00}
    ]);

// Desserts
    insertDishes(65, [
        {name: 'Mango Sticky Rice', description: 'Sticky rice with mango and coconut milk', price: 6.50},
        {name: 'Coconut Tapioca', description: 'Warm coconut dessert with tapioca pearls', price: 6.00}
    ]);

// Drinks
    insertDishes(66, [
        {name: 'Vietnamese Iced Coffee', description: 'Strong coffee with condensed milk', price: 4.50},
        {name: 'Jasmine Tea', description: 'Hot jasmine tea', price: 3.00},
        {name: 'Lychee Juice', description: 'Sweet lychee fruit drink', price: 3.50}
    ]);


// **** 12. Veggie South (Vegetarian) **** //

// Bowls
    insertDishes(67, [
        {name: 'Buddha Bowl', description: 'Quinoa, roasted vegetables, hummus and tahini', price: 11.50},
        {name: 'Falafel Bowl', description: 'Falafel, couscous, salad and yogurt sauce', price: 12.00},
        {name: 'Avocado Power Bowl', description: 'Brown rice, avocado, chickpeas and greens', price: 12.50}
    ]);

// Salads
    insertDishes(68, [
        {name: 'Mediterranean Salad', description: 'Tomatoes, cucumber, olives, feta cheese', price: 9.50},
        {name: 'Green Detox Salad', description: 'Mixed greens, apple, nuts and lemon dressing', price: 10.00}
    ]);

// Warm Dishes
    insertDishes(69, [
        {name: 'Vegetable Curry', description: 'Seasonal vegetables in mild coconut curry', price: 12.50},
        {name: 'Stuffed Bell Peppers', description: 'Peppers filled with rice and vegetables', price: 11.50},
        {name: 'Lentil Stew', description: 'Hearty lentil stew with herbs and bread', price: 10.50}
    ]);

// Desserts
    insertDishes(70, [
        {name: 'Vegan Chocolate Cake', description: 'Rich chocolate cake without animal products', price: 6.50},
        {name: 'Chia Pudding', description: 'Chia seeds with almond milk and berries', price: 5.50}
    ]);

// Drinks
    insertDishes(71, [
        {name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice', price: 4.50},
        {name: 'Herbal Tea', description: 'Selection of herbal teas', price: 3.00},
        {name: 'Mineral Water', description: 'Still or sparkling water', price: 2.50}
    ]);


// **** 13. Istanbul Grill (Kebab) **** //

// Kebap
    insertDishes(72, [
        {name: 'Adana Kebap', description: 'Spicy minced lamb kebap grilled over charcoal', price: 12.50},
        {name: 'Urfa Kebap', description: 'Mild minced meat kebap with herbs', price: 12.00},
        {name: 'Chicken Shish', description: 'Grilled chicken skewers with spices', price: 11.50}
    ]);

// Wraps
    insertDishes(73, [
        {name: 'Adana Wrap', description: 'Adana kebap wrapped in flatbread with salad', price: 8.50},
        {name: 'Chicken Shish Wrap', description: 'Chicken skewer wrap with garlic sauce', price: 8.00},
        {name: 'Halloumi Wrap', description: 'Grilled halloumi with vegetables', price: 7.50}
    ]);

// Plates
    insertDishes(74, [
        {name: 'Mixed Grill Plate', description: 'Selection of kebaps with rice and salad', price: 16.50},
        {name: 'Adana Plate', description: 'Adana kebap served with bulgur and grilled vegetables', price: 14.50},
        {name: 'Chicken Shish Plate', description: 'Chicken skewers with rice and yogurt sauce', price: 13.50}
    ]);

// Sides
    insertDishes(75, [
        {name: 'Bulgur', description: 'Seasoned bulgur wheat', price: 3.50},
        {name: 'Grilled Vegetables', description: 'Char-grilled seasonal vegetables', price: 4.50},
        {name: 'Shepherd Salad', description: 'Tomatoes, cucumber, onions and parsley', price: 4.00}
    ]);

// Drinks
    insertDishes(76, [
        {name: 'Ayran', description: 'Traditional yogurt drink', price: 3.00},
        {name: 'Turkish Tea', description: 'Strong black tea served hot', price: 2.50},
        {name: 'Mineral Water', description: 'Still or sparkling water', price: 2.50}
    ]);


// **** 14. Factory Bites (Fast Food) **** //

// Fast Food
    insertDishes(77, [
        {name: 'Cheeseburger', description: 'Beef patty, cheese, pickles and sauce', price: 8.50},
        {name: 'Chicken Nuggets (8 pcs)', description: 'Crispy breaded chicken nuggets', price: 7.50},
        {name: 'Hot Dog', description: 'Sausage in bun with mustard and ketchup', price: 6.50},
        {name: 'Veggie Burger', description: 'Plant-based patty with lettuce and sauce', price: 8.00}
    ]);

// Sides
    insertDishes(78, [
        {name: 'French Fries', description: 'Classic crispy fries', price: 3.50},
        {name: 'Curly Fries', description: 'Seasoned spiral fries', price: 4.00},
        {name: 'Mozzarella Sticks', description: 'Fried mozzarella with dip', price: 5.50}
    ]);

// Desserts
    insertDishes(79, [
        {name: 'Chocolate Donut', description: 'Donut with chocolate glaze', price: 3.00},
        {name: 'Ice Cream Cup', description: 'Vanilla ice cream with chocolate sauce', price: 3.50}
    ]);

// Drinks
    insertDishes(80, [
        {name: 'Cola', description: 'Chilled soft drink', price: 3.00},
        {name: 'Orange Soda', description: 'Sparkling orange drink', price: 3.00},
        {name: 'Milkshake Strawberry', description: 'Creamy strawberry milkshake', price: 4.50}
    ]);


// **** 15. Grill Station (Burgers) **** //

// Grill
    insertDishes(81, [
        {name: 'Grilled Beef Burger', description: 'Grilled beef patty, cheddar, lettuce, tomato', price: 11.50},
        {name: 'BBQ Bacon Burger', description: 'Beef patty, bacon, BBQ sauce, onion', price: 13.00},
        {name: 'Grilled Chicken Burger', description: 'Grilled chicken breast with herb mayo', price: 11.00},
        {name: 'Veggie Grill Burger', description: 'Grilled vegetable patty with avocado', price: 11.50}
    ]);

// Sides
    insertDishes(82, [
        {name: 'Steak Fries', description: 'Thick-cut grilled-style fries', price: 4.50},
        {name: 'Grilled Corn', description: 'Corn on the cob with butter', price: 4.00},
        {name: 'Coleslaw', description: 'Creamy cabbage salad', price: 3.50}
    ]);

// Desserts
    insertDishes(83, [
        {name: 'Cheesecake', description: 'Classic cheesecake with berry topping', price: 6.50},
        {name: 'Brownie with Ice Cream', description: 'Warm brownie served with vanilla ice cream', price: 7.00}
    ]);

// Drinks
    insertDishes(84, [
        {name: 'Cola', description: 'Chilled soft drink', price: 3.00},
        {name: 'Craft Beer', description: 'Local craft beer', price: 5.50},
        {name: 'Iced Tea', description: 'House-made iced tea', price: 3.50}
    ]);


// **** 16. Pasta Depot (Italian) **** //

// Starters
    insertDishes(85, [
        {name: 'Bruschetta Classica', description: 'Toasted bread with tomato, garlic and basil', price: 6.00},
        {name: 'Garlic Bread', description: 'Oven-baked bread with garlic butter', price: 5.50}
    ]);

// Pasta
    insertDishes(86, [
        {name: 'Spaghetti Carbonara', description: 'Egg, pancetta, parmesan, black pepper', price: 12.50},
        {name: 'Penne Arrabbiata', description: 'Spicy tomato sauce with garlic and chili', price: 10.90},
        {name: 'Tagliatelle Bolognese', description: 'Slow-cooked beef ragù', price: 13.50},
        {name: 'Spaghetti Vongole', description: 'Clams, white wine, garlic and parsley', price: 14.90},
        {name: 'Lasagna al Forno', description: 'Baked pasta with meat sauce and béchamel', price: 13.90}
    ]);

// Salads
    insertDishes(87, [
        {name: 'Caprese Salad', description: 'Mozzarella, tomato, basil, olive oil', price: 8.50},
        {name: 'Rocket Parmesan Salad', description: 'Arugula with shaved parmesan and lemon dressing', price: 7.90}
    ]);

// Desserts
    insertDishes(88, [
        {name: 'Tiramisu', description: 'Classic espresso dessert with mascarpone', price: 6.50},
        {name: 'Panna Cotta', description: 'Vanilla cream with berry sauce', price: 6.00},
        {name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with liquid center', price: 7.50}
    ]);

// Drinks
    insertDishes(89, [
        {name: 'Sparkling Water', description: 'Italian mineral water', price: 3.50},
        {name: 'Cola', description: 'Chilled soft drink', price: 3.00},
        {name: 'House Red Wine (0.2l)', description: 'Italian red table wine', price: 5.50},
        {name: 'Espresso', description: 'Strong Italian espresso', price: 2.50}
    ]);


// **** 17. Curry Factory (Indian) **** //

// Soups
    insertDishes(90, [
        {name: 'Dal Soup', description: 'Spiced lentil soup with cumin and garlic', price: 5.50},
        {name: 'Tomato Shorba', description: 'Indian-style tomato soup with herbs', price: 5.00}
    ]);

// Starters
    insertDishes(91, [
        {name: 'Vegetable Samosa', description: 'Crispy pastry filled with spiced potatoes and peas', price: 6.00},
        {name: 'Chicken Pakora', description: 'Deep-fried spiced chicken fritters', price: 7.50},
        {name: 'Paneer Tikka', description: 'Grilled marinated paneer cheese', price: 8.00}
    ]);

// Curries
    insertDishes(92, [
        {name: 'Chicken Tikka Masala', description: 'Creamy tomato curry with grilled chicken', price: 13.50},
        {name: 'Butter Chicken', description: 'Rich buttery curry with tender chicken', price: 14.00},
        {name: 'Palak Paneer', description: 'Spinach curry with fresh paneer cheese', price: 12.50},
        {name: 'Lamb Rogan Josh', description: 'Slow-cooked lamb curry with aromatic spices', price: 15.90}
    ]);

// Rice Dishes
    insertDishes(93, [
        {name: 'Plain Basmati Rice', description: 'Steamed long-grain basmati rice', price: 4.00},
        {name: 'Vegetable Biryani', description: 'Fragrant rice with mixed vegetables and spices', price: 11.50},
        {name: 'Chicken Biryani', description: 'Spiced rice with marinated chicken', price: 13.00}
    ]);

// Specials
    insertDishes(94, [
        {name: 'Tandoori Chicken', description: 'Clay oven roasted chicken with spices', price: 15.50},
        {name: 'Mixed Grill Platter', description: 'Selection of tandoori meats', price: 18.90}
    ]);

// Desserts
    insertDishes(95, [
        {name: 'Gulab Jamun', description: 'Milk dumplings in sugar syrup', price: 5.50},
        {name: 'Mango Kulfi', description: 'Traditional Indian mango ice cream', price: 6.00}
    ]);

// Drinks
    insertDishes(96, [
        {name: 'Mango Lassi', description: 'Sweet yogurt drink with mango', price: 4.50},
        {name: 'Masala Chai', description: 'Spiced Indian tea with milk', price: 3.50},
        {name: 'Mineral Water', description: 'Still or sparkling', price: 2.50}
    ]);
    console.log('Dishes seeded');


})




