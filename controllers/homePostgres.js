const pool = require('../queries');

exports.createHome = (req, res) => {
    if (!(req.body.order && req.body.language && req.body.text)) {
        res.status(400).json({message: 'Order, language and text are required'})
        return;
    }
    if (!req.body.language) {
        res.status(400).json({message: 'Language is required'})
        return;
    }
    let noLanguage;
    pool.query('Select noLanguage FROM languages' + process.env.NODE_ENV + ' WHERE language = $1', [req.body.language], (error, results) => {
        if (error) {
            res.status(400).json({error: error});
            return;
        }
        if (results.rows.length = !0) {
            res.status(400).json({message: results.rows[0].length + ' language already exists'});
            return;
        }
        noLanguage = results.rows[0].nolanguage;
    });

    if (!req.body.text) {
        res.status(400).json({message: 'Text is required'})
        return;
    }

    if (!req.body.order) {
        pool.query('Select max(orderHomeParagraph) from homeParagraphs' + process.env.NODE_ENV + ' where nolanguage = $1', [noLanguage], (error, results) => {
            if (error) {
                res.status(400).json({error: error});
                return;
            }
            req.body.order = results.rows[0].max + 1;
        });
    }

    pool.query('INSERT INTO homeParagraphs' + process.env.NODE_ENV + ' (orderHomeParagraph, noLanguage, text) VALUES ($1, $2, $3)', [req.body.order, noLanguage, req.body.text], (error, results) => {
        if (error) {
            res.status(400).json({error: error});
            return;
        }
        res.status(201).json({message: 'Home paragraph created successfully with order ' + req.body.order + ', language ' + req.body.language + ' and text ' + req.body.text});
    });
}


exports.getHome = (req, res) => {
    if (req.params.language) {
        let noLanguage;
        pool.query('Select * from languages' + process.env.NODE_ENV + ' where language = $1', [req.params.language], (error, results) => {
            if (error) {
                res.status(400).json({error: error});
                return;
            }
            if (results.rows.length === 0) {
                res.status(400).json({message: req.params.language + ' language does not exist'});
                return;
            }
            noLanguage = results.rows[0].nolanguage;

            pool.query('Select textHomeParagraph from homeParagraphs' + process.env.NODE_ENV + ' where noLanguage = $1 order by orderHomeParagraph', [noLanguage], (error, results) => {
                if (error) {
                    res.status(400).json({error: error});
                    return;
                }
                let output = [];
                results.rows.forEach(row => {
                    if (output.length == 0 || output[output.length - 1].noLanguage != noLanguage) {
                        output.push({noLanguage: noLanguage, paragraphs: [row.texthomeparagraph]});
                    } else {
                        output[output.length - 1].paragraphs.push(row.texthomeparagraph);
                    }
                });
                res.status(200).json(output);
                return;
            });
        });
    } else {
        pool.query('Select textHomeParagraph, noLanguage from homeParagraphs' + process.env.NODE_ENV + ' order by noLanguage, orderHomeParagraph', (error, results) => {
                if (error) {
                    res.status(400).json({error: error});
                    return;
                }

                let output = [];
                results.rows.forEach(row => {
                    if (output.length == 0 || output[output.length - 1].noLanguage != row.nolanguage) {
                        output.push({noLanguage: row.nolanguage, paragraphs: [row.texthomeparagraph]});
                    } else {
                        output[output.length - 1].paragraphs.push(row.texthomeparagraph);
                    }
                });

                res.status(200).json(output);
            }
        )
        ;
    }
}

exports.deleteHome = (req, res) => {
    if (!req.body.language) {
        res.status(400).json({message: 'Language is required'})
        return;
    }

    if (!req.body.order) {
        res.status(400).json({message: 'Order is required'})
        return;
    }

    let noLanguage;
    pool.query('Select noLanguage FROM languages' + process.env.NODE_ENV + ' WHERE language = $1', [req.body.language], (error, results) => {
        if (error) {
            res.status(400).json({error: error});
            return;
        }
        if (results.rows.length = !0) {
            res.status(400).json({message: results.rows[0].length + ' language already exists'});
            return;
        }
        noLanguage = results.rows[0].nolanguage;
    });

    pool.query('DELETE FROM homeParagraph' + process.env.NODE_ENV + ' WHERE orderHomeParagraph = $1 and noLanguage = $2', [req.body.order, noLanguage], (error, results) => {
        if (error) {
            res.status(400).json({error: error});
            return;
        }
        res.status(200).json({message: 'Home paragraph deleted successfully with order ' + req.body.order + ' and language ' + req.body.language});
    });
}

exports.updateHome = (req, res) => {
    if (!(req.body.language && req.body.order && req.body.text)) {
        res.status(400).json({message: 'Language, order number and paragraph are required'})
        return;
    }

    let noLanguage;
    pool.query('Select noLanguage FROM languages' + process.env.NODE_ENV + ' WHERE language = $1', [req.body.language], (error, results) => {
        if (error) {
            res.status(400).json({error: error});
            return;
        }
        if (results.rows.length = !0) {
            res.status(400).json({message: results.rows[0].length + ' language already exists'});
            return;
        }
        noLanguage = results.rows[0].nolanguage;
    });

    pool.query('Select * from homeParagraph' + process.env.NODE_ENV + ' where orderHomeParagraph = $1 and noLanguage = $2', [req.body.order, noLanguage], (error, results) => {
        if (error) {
            res.status(400).json({error: error});
            return;
        }
        if (results.rows.length = !0) {
            res.status(400).json({message: results.rows[0].length + ' paragraph does not exist with order ' + req.body.order + ' and language ' + req.body.language});
            return;
        }
    });

    pool.query('UPDATE homeParagraph' + process.env.NODE_ENV + ' SET text = $1 WHERE orderHomeParagraph = $2 and noLanguage = $3', [req.body.text, req.body.order, noLanguage], (error, results) => {
        if (error) {
            res.status(400).json({error: error});
            return;
        }
        res.status(200).json({message: 'Home paragraph updated successfully with order ' + req.body.order + ', language ' + req.body.language + ' and text ' + req.body.text});
    });
}
  