const pool = require('../queries');

exports.getHome = (req, res) => {
  if (req.body.language) {
    pool.query(
      'SELECT paragraph FROM homes WHERE language = ' + "'" + req.body.language + "'" + ' order by order_number',
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows);
      }
    );
  }
  else {
    pool.query('SELECT paragraph FROM homes order by language, order_number', (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  }
}
  