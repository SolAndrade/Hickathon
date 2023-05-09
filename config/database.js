const mysql = require('mysql2/promise');

// // Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'ironhack',
  database: 'Management'
});

// Export the pool for use in other modules
module.exports = pool;


//for postgre
// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'Hickathon',
//   password: 'user',
//   port: 5432, // default PostgreSQL port
// });



