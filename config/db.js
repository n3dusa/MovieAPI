import pkg from 'pg'; 
const { Pool } = pkg; 


const pool = new Pool({
  user: 'postgres',     
  host: 'localhost',    
  database: 'postgres', 
  password: '1305',     
  port: 5432,           
});


async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Database connected successfully');
    client.release();  
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
}

testConnection();

// Export the pool for use in other files
export default pool;




