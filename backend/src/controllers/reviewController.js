const db = require('../database/db');

// POST /reviews => create a new review
function createReview(req, res) {
    const { userId, restaurantId, rating, comment } = req.body;

    if(!userId || !restaurantId || !rating){
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
        (err, review) => {
            if (err) {
                return res.status(400).json({error: 'Failed to create review'});
            }

            res.status(201).json({message: 'Review created'});
        }
    );
}