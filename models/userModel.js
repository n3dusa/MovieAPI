import pool from '../config/db.js';

// Register a new user
export const registerUser = async ({ name, username, password, year_of_birth }) => {
    const query = `
        INSERT INTO "user" (name, username, password, year_of_birth)
        VALUES ($1, $2, $3, $4)
        RETURNING *`;
    const values = [name, username, password, year_of_birth];

    try {
        const result = await pool.query(query, values);
        console.log('User registration successful:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error during user registration:', error.message);
        throw error; // Rethrow the error so it can be caught in the route handler
    }
};

// Get all users
export const getAllUsers = async () => {
    const query = 'SELECT * FROM "user" ORDER BY id ASC';

    try {
        const result = await pool.query(query);
        console.log('Users fetched successfully:', result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error fetching users:', error.message);
        throw error;
    }
};





