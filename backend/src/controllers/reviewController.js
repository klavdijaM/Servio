const db = require('../database/db');

// POST /reviews => create a new review
function createReview(req, res) {
    const userId = req.user.id;
    const { restaurantId, rating, comment } = req.body;

    if(!restaurantId || !rating){
        return res.status(400).json({error: 'Missing required review data'});
    }
    if(rating < 1 || rating > 5) {
        return res.status(400).json({error: 'Rating must be between 1 and 5'});
    }

    const query = `
    INSERT INTO reviews (user_id, restaurant_id, rating, comment)
    VALUES (?,?,?,?)`;

    db.run(
        query,
        [userId, restaurantId, rating, comment ?? null],
        (err) => {
            if (err) {
                return res.status(400).json({error: 'Failed to create review'});
            }

            res.status(201).json({message: 'Review created'});
        }
    );
}

// GET /restaurants/:id/reviews => returns reviews for a single restaurant
function getReviewsByRestaurant(req, res) {
    const restaurantId = req.params.id;

    const query = `
    SELECT r.id, r.rating, r.comment, r.created_at, u.email AS user_email
    FROM reviews r
    JOIN users u ON u.id = r.user_id --finds the user whose users.id matches reviews.user_id, and attaches their data to the same row
    WHERE r.restaurant_id = ?
    ORDER BY r.created_at DESC`

    db.all(query, [restaurantId], (err, reviews) => {
        if (err) {
            return res.status(500).json({error: 'Database error'});
        }

        res.json(reviews);
    });
}

module.exports = {
    createReview,
    getReviewsByRestaurant,
}