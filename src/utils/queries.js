const Pool = require('pg').Pool;

const pool = new Pool({
    connectionString: process.env.postgresConnectionUrl,
    ssl: {
        rejectUnauthorized: false
    }
});
console.log('Connected to postgres');


module.exports = pool;
