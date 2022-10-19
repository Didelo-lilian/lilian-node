const pool = require('../queries');

exports.createHome = (req, res) => {
  if(!req.body.order_number){
    pool.query('Select order_number from homes where language = $1 order by order_number desc limit 1', [req.body.language], (error, results) => {
      if(error) {
        res.status(400).json({error: error});
      }
      if(results.rows.length > 0) {
        pool.query('INSERT INTO homes (language, paragraph, order_number) VALUES ($1, $2, $3)', [req.body.language, req.body.paragraph, results.rows[0].order_number + 1], (error, results) => {
          if(error) {
            res.status(400).json({error: error});
          }
          res.status(201).send({message: `Home added with language: ${req.body.language}, paragraph: ${req.body.paragraph}, order_number: ${results.rows[0].order_number + 1}`})
        }
        );
      } else {
        pool.query('INSERT INTO homes (language, paragraph, order_number) VALUES ($1, $2, $3)', [req.body.language, req.body.paragraph, req.body.paragraph, 1], (error, results) => {
          if(error) {
            res.status(400).json({error: error});
          }
          res.status(201).send({message: `Home added with language: ${req.body.language}, paragraph: ${req.body.paragraph}, order_number: 1`})
        }
        );
      }
  }
  );
  } else {
    if(req.body.language && req.body.paragraph) {
      pool.query(
        'SELECT order_number FROM homes WHERE language = $1 and order_number = $2', [req.body.language, req.body.order_number], (error, results) => {
          if (error) {
            res.status(400).json({error: error});
          }
          if(results.rows.length > 0) {
            pool.query(
              'UPDATE homes SET paragraph = $1, order_number = $2 WHERE language = $3', [req.body.paragraph, req.body.order_number, req.body.language], (error, results) => {
                if (error) {
                  res.status(400).json({error: error});
                }
                res.status(201).json({ message: 'Home updated with language: ' + req.body.language + ', paragraph: ' + req.body.paragraph + ', order_number: ' + req.body.order_number });
              }
            )
          } else {
            pool.query('INSERT INTO homes (language, paragraph, order_number) VALUES ($1, $2, $3)', [req.body.language, req.body.paragraph, req.body.order_number],
            (error, results) => {
              if (error) {
                console.log(error);
                res.status(400).json({error: error});
              }
              res.status(201).send({ message:`Home added with language: ${req.body.language}, paragraph: ${req.body.paragraph}, order_number: ${req.body.order_number}`})
            })  
          }
        }
      )
    } else {
      res.status(400).json({ message: 'Language and paragraphs are required' })
    }
  }
}



exports.getHome = (req, res) => {
  if (req.params.language) {
    pool.query(
      'SELECT paragraph FROM homes WHERE language = $1 order by order_number', [req.params.language],
      (error, results) => {
        if (error) {
          res.status(400).json({error: error});
        }
        res.status(200).json(results.rows);
      }
    );
  }
  else {
    pool.query('SELECT paragraph FROM homes order by language, order_number', (error, results) => {
      if (error) {
        res.status(400).json({error: error});
      }
      res.status(200).json(results.rows);
    });
  }
}

exports.deleteHome = (req, res) => {
   if(!req.body.language) {
        res.status(400).json({ message: 'Language is required' })
   }
   pool.query(
       'Select * from homes where language = $1', [req.body.language], (error, results) => {
              if(error) {
                res.status(400).json({error: error});
              }
              if(results.rows.length > 0) {
                if(!req.body.order_number) {
                  pool.query(
                    'DELETE FROM homes WHERE language = $1', [req.body.language], (error, results) => {
                      if (error) {
                        res.status(400).json({error: error});
                      }
                      res.status(201).json({ message: 'Home deleted with language: ' + req.body.language });
                    }
                  )
                }
                else {
                    pool.query(
                        'Select * from homes where language = $1 and order_number = $2', [req.body.language, req.body.order_number], (error, results) => {
                                if(error) {
                                    res.status(400).json({error: error});
                                }
                                if(results.rows.length > 0) {
                                    pool.query(
                                        'DELETE FROM homes WHERE language = $1 and order_number = $2', [req.body.language, req.body.order_number], (error, results) => {
                                        if (error) {
                                            res.status(400).json({error: error});
                                        }
                                        res.status(201).json({ message: 'Home deleted with language: ' + req.body.language + ', order_number: ' + req.body.order_number });
                                        }
                                    )
                                } else {
                                    res.status(400).json({ message: 'Order number does not exist for this language' })
                                }
                        }
                    )
                }
              } else {
                res.status(400).json({ message: 'Language does not exist' })
              }
       }
   )
}

exports.updateHome = (req, res) => {
    if(req.body.language && req.body.order_number && req.body.paragraph) {
        pool.query(
        'UPDATE homes SET paragraph = $1 WHERE language = $2 and order_number = $3', [req.body.paragraph, req.body.language, req.body.order_number], (error, results) => {
            if (error) {
            res.status(400).json({error: error});
            }
            res.status(201).json({ message: 'Home updated with language: ' + req.body.language + ', paragraph: ' + req.body.paragraph + ', order_number: ' + req.body.order_number });
        }
        )
    } else {
        res.status(400).json({ message: 'Language, order_number and paragraph are required' })
    }
}
  