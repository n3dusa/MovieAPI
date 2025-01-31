import pool from '../config/db.js';
import express from 'express';
import { addMovie, getMovies, getMovieById, removeMovieById, getMoviesByKeyword } from '../models/movieModel.js';
import { addReview } from '../models/reviewModel.js';
import { addFavoriteMovie, getFavoriteMoviesByUsername } from '../models/favoriteMovieModel.js';

const router = express.Router();

// POST: Add a movie to user's favorites
router.post('/:movieId/favorite', async (req, res) => {
    const { username } = req.body;
    const { movieId } = req.params;

    // Validate that username is provided
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        // Check if the movie exists in the database
        const movieQuery = await pool.query('SELECT id FROM movie WHERE id = $1', [movieId]);
        if (movieQuery.rowCount === 0) {
            return res.status(404).json({ error: 'Movie does not exist' });
        }

        // Add movie to favorites
        const favorite = await addFavoriteMovie(username, movieId);

        // Return success message
        res.status(201).json(favorite);
    } catch (error) {
        console.error("Error adding favorite movie:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET: Get favorite movies by username
router.get('/:username/favorites', async (req, res) => {
    const { username } = req.params;
    try {
        const favorites = await getFavoriteMoviesByUsername(username);
        if (!favorites || favorites.length === 0) {
            return res.status(404).json({ error: 'No favorite movies found for this user' });
        }
        res.json(favorites);
    } catch (error) {
        console.error("Error retrieving favorite movies:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
