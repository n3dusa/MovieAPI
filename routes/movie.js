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

        // If no favorites are found, return a custom error message
        if (!favorites || favorites.length === 0) {
            return res.status(404).json({ error: 'No favorite movies found for this user' });
        }

        // Return the list of favorite movies
        res.json(favorites);
    } catch (error) {
        console.error("Error retrieving favorite movies:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST: Add a new movie
router.post('/', async (req, res) => {
    const { name, year, genreName } = req.body;
    if (!name || !year || !genreName) {
        return res.status(400).json({ error: 'Movie name, year, and genreName are required' });
    }

    try {
        const genreCheck = await pool.query('SELECT id FROM genre WHERE name = $1', [genreName]);
        if (genreCheck.rowCount === 0) {
            return res.status(400).json({ error: 'Invalid genre name' });
        }

        const genreId = genreCheck.rows[0].id;
        const newMovie = await addMovie({ name, year, genreId });
        res.status(201).json(newMovie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET: Get all movies with pagination
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const movies = await getMovies(page, limit);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET: Get movie by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await getMovieById(id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE: Remove movie by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const removedMovie = await removeMovieById(id);
        if (!removedMovie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json({ message: 'Movie removed' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST: Add a movie review
router.post('/review', async (req, res) => {
    const { username, stars, reviewText, movieId } = req.body;

    if (!username || !stars || !reviewText || !movieId) {
        return res.status(400).json({ error: 'Username, stars, review text, and movie ID are required' });
    }

    try {
        const review = await addReview(username, stars, reviewText, movieId);
        res.status(201).json(review);  // Successfully created
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ error: error.message });  // Bad request if error occurs
    }

});


// GET: Get movies by keyword
router.get('/search', async (req, res) => {
    const { keyword } = req.query;

    if (!keyword) {
        return res.status(400).json({ error: 'Keyword is required' });
    }

    try {
        // Call the function to get movies matching the keyword (in name or genre)
        const movies = await getMoviesByKeyword(keyword);

        if (movies.length === 0) {
            return res.status(404).json({ error: 'No movies found for the given keyword' });
        }

        res.json(movies);
    } catch (error) {
        console.error("Error retrieving movies by keyword:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



export default router;  