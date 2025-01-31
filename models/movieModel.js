import pool from '../config/db.js';

// Add a new movie
export const addMovie = async ({ name, year, genreId }) => {
    const query = `
        INSERT INTO movie (name, year, genre_id)
        VALUES ($1, $2, $3)
        RETURNING *`;
    const values = [name, year, genreId];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Get a movie by ID
export const getMovieById = async (id) => {
    const query = `
        SELECT movie.id, movie.name, movie.year, genre.name AS genre
        FROM movie
        JOIN genre ON movie.genre_id = genre.id
        WHERE movie.id = $1`;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Get all movies with optional pagination
export const getMovies = async (page = 1, pageSize = 10) => {
    const offset = (page - 1) * pageSize;
    const query = `
        SELECT movie.id, movie.name, movie.year, genre.name AS genre
        FROM movie
        JOIN genre ON movie.genre_id = genre.id
        LIMIT $1 OFFSET $2`;
    const values = [pageSize, offset];
    const result = await pool.query(query, values);
    return result.rows;
};


// Remove a movie by ID
export const removeMovieById = async (id) => {
    const query = 'DELETE FROM movie WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Get movies by keyword (search functionality)
export const getMoviesByKeyword = async (keyword) => {
    try {
        console.log("Searching movies with keyword:", keyword); // Debugging log

        const query = `
            SELECT movie.id, movie.name, movie.year, genre.name AS genre
            FROM movie
            JOIN genre ON movie.genre_id = genre.id
            WHERE movie.name ILIKE $1 
               OR genre.name ILIKE $1 
               OR CAST(movie.year AS TEXT) ILIKE $1
        `;

        const values = [`%${keyword}%`];
        const result = await pool.query(query, values);

        console.log("Movies found:", result.rows); // Debugging log
        return result.rows;

    } catch (error) {
        console.error("Error in getMoviesByKeyword:", error);
        throw error;
    }
};

