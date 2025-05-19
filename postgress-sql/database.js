require('dotenv').config();
const { Pool } = require('pg');

// PostgreSQL connection
const pool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
});

// Function to check and create the table if it doesn't exist
const createTableIfNotExists = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                age INT
            );
        `);
        console.log("'users' table is ready!");
    } catch (err) {
        console.error("Error creating table:", err);
    }
};

// Initialize database setup
(async () => {
    await pool.connect();
    console.log("Connected to PostgreSQL successfully!");
    await createTableIfNotExists();
})();

module.exports = pool;
