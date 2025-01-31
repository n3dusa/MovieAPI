import pool from '../config/db.js';

// Add a movie to a user's favorites
export const addFavoriteMovie = async (username, movieId) => {
    try {
        // Get user_id from username
        const userQuery = await pool.query('SELECT id FROM "user" WHERE username = $1', [username]);
        if (userQuery.rowCount === 0) {
            throw new Error('User does not exist');
        }
        const userId = userQuery.rows[0].id;

        // Check if movie exists
        const movieQuery = await pool.query('SELECT id FROM movie WHERE id = $1', [movieId]);
        if (movieQuery.rowCount === 0) {
            throw new Error('Movie does not exist');
        }

        // Insert favorite movie
        await pool.query(
            'INSERT INTO favoritemovie (user_id, movie_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
            [userId, movieId]
        );

        return { message: 'Movie added to favorites' };
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error adding favorite movie');
    }
};

// Get all favorite movies for a specific user
export const getFavoriteMoviesByUsername = async (username) => {
    try {
        // Get user_id from username
        const userQuery = await pool.query('SELECT id FROM "user" WHERE username = $1', [username]);
        if (userQuery.rowCount === 0) {
            throw new Error('User does not exist');
        }
        const userId = userQuery.rows[0].id;

        // Get favorite movies
        const result = await pool.query(
            `SELECT movie.id, movie.name, movie.year FROM favoritemovie
             JOIN movie ON favoritemovie.movie_id = movie.id
             WHERE favoritemovie.user_id = $1`,
            [userId]
        );

        return result.rows; // Return an array of favorite movies
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error getting favorite movies');
    }
};
