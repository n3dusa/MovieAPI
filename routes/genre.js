import express from 'express';
import { addGenre, getGenres 
} from '../models/genreModel.js';  // Import functions from genreModel.js

const router = express.Router();

// POST: Add a new genre
router.post('/', async (req, res) => {
    const { name } = req.body; // Extract genre name from request body
    if (!name || name.trim() === '') { // Check for empty or missing name
        return res.status(400).json({ error: 'Genre name is required' });
    }
    try {
        const newGenre = await addGenre(name);
        res.status(201).json(newGenre); // Return the new genre data
    } catch (error) {
        if (error.code === '23505') { // Handle unique constraint violation
            res.status(400).json({ error: 'Genre already exists' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});


// GET: Get all genres
router.get('/', async (req, res) => {
    try {
        const genres = await getGenres();
        res.json(genres);  // Return the list of genres
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Middleware to log requests
router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

export default router;  // Export the genre router for use in server.js

