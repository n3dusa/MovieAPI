import express from 'express';
import { registerUser, getAllUsers } from '../models/userModel.js';

const router = express.Router();

// POST: Register a new user
router.post('/register', async (req, res) => {
    const { name, username, password, year_of_birth } = req.body;

    console.log('Request body:', req.body); 

    // Validate incoming data
    if (!name || !username || !password || !year_of_birth) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    try {
        const newUser = await registerUser({ name, username, password, year_of_birth });
        res.status(201).json(newUser); // Return the new user data
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

// GET: Get all registered users
router.get('/register', async (req, res) => {
    try {
        const users = await getAllUsers(); // Fetch all users
        res.json(users); // Return the list of users
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

export default router;





