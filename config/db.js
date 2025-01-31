import pkg from 'pg'; // Import the CommonJS module
const { Pool } = pkg; // Destructure the Pool class from the default export

// Setup connection pool
const pool = new Pool({
  user: 'postgres',     // Replace with your PostgreSQL username
  host: 'localhost',    // Replace with your database host
  database: 'postgres', // Replace with your database name
  password: '1305',     // Replace with your database password
  port: 5432,           // Replace with your database port (default is 5432)
});

// Test the connection when starting
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Database connected successfully');
    client.release();  // Release the client after testing
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
}

testConnection();

// Export the pool for use in other files
export default pool;




