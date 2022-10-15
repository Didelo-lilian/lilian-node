const Pool = require('pg').Pool;
const pool = new Pool({
  connectionString: process.env.postgresConnectionUrl,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;