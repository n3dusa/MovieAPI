import pool from '../config/db.js';  // Import the pool object correctly

// Add a review to a movie
export const addReview = async (username, stars, reviewText, movieId) => {
    try {
        // Get user_id from username
        const userQuery = await pool.query('SELECT id FROM "user" WHERE username ILIKE $1', [username]);
        if (userQuery.rowCount === 0) {
            throw new Error('User does not exist');
        }
        const userId = userQuery.rows[0].id;

        // Check if movie exists
        const movieQuery = await pool.query('SELECT id FROM movie WHERE id = $1', [movieId]);
        if (movieQuery.rowCount === 0) {
            throw new Error('Movie does not exist');
        }

        // Insert review using user_id
        const result = await pool.query(
            'INSERT INTO review (user_id, movie_id, stars, review_text) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, movieId, stars, reviewText]
        );
        return result.rows[0];  // Return the newly created review
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error adding review');
    }
};


// Get all reviews for a specific movie
export const getReviewsByMovieId = async (movieId) => {
    try {
        const result = await pool.query(
            'SELECT r.id, u.username, r.stars, r.review_text FROM review r INNER JOIN "user" u ON r.user_id = u.id WHERE r.movie_id = $1',
            [movieId]
        );
        return result.rows; // Return an array of reviews
    } catch (error) {
        console.error(error);
        throw new Error('Error getting reviews');
    }
};

