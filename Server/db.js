const Pool = require("pg").Pool

// Create postgres instance of db and export to perform methods
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: 'RolsaTech'
})

module.exports = pool;
