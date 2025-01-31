import pool from '../config/db.js'; // Assuming db.js exports the database pool

// Add a new genre
export const addGenre = async (genreName) => {
    const query = 'INSERT INTO genre (name) VALUES ($1) RETURNING *';
    const values = [genreName];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Get all genres
export const getGenres = async () => {
    const query = 'SELECT * FROM genre';
    const result = await pool.query(query);
    return result.rows;
};

