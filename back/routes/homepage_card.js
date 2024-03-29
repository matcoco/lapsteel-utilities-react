const express = require('express');
const router = express.Router();
const pool = require('../config.js');
const bodyParser = require('body-parser');
const url = "/homepage_card";
const authAdmin = require('./verifyTokenAdmin');




router.get(url + '/all', (req, res) => {
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT * FROM homepage_card`, (err, results, fields) => {
            connection.release();
            if (err) {
                res.status(501).send(err.message);
            } else {
                res.status(200).send(results);
            }

        });
    });

});




router.get(url + '/', (req, res) => {
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT i.name, i.url, i.alt, h.image_id, h.id, h.title, h.subtitle, h.description, h.isActived FROM homepage_card AS h JOIN image AS i ON h.image_id = i.id`,
             (err, results, fields) => {
                connection.release();
                if (err) {
                    res.status(501).send(err.message);
                } else {
                    res.status(200).send(results);
                }

            });
    });

});


router.get(url + "/:id", (req, res) => {
    const id = req.params.id;
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT * FROM homepage_card WHERE id=?`, [id], (err, results, fields) => {
            connection.release();
            if (err) {
                res.status(501).send(err.message);
            } else {
                res.status(200).send(results);
            }

        });
    });

});

router.post(url, authAdmin, (req, res) => {
    pool.getConnection(function (err, connection) {
    
        const formData = req.body;
        connection.query(`INSERT INTO homepage_card (title, subtitle, description,image_id, isActived) VALUES (?,?,?,?,?)`,
            [formData.title, formData.subtitle, formData.description, formData.image_id, formData.isActived], (err, results, fields) => {
                connection.release();
                if (err) {
                    res.status(501).send(err);
                } else {
                    const id = results.insertId;
                    connection.query(`SELECT * FROM homepage_card WHERE id=?`, [id], (err, results, fields) => {
                        if (err) {
                            res.status(501).send(err);
                        } else {
                            res.json(results)
                        }
                    });
                }
            });
    });

});

router.put(url + '/:id', authAdmin, (req, res) => {
    const id = req.params.id;

    pool.getConnection(function (err, connection) {
        const formData = req.body;

        connection.query(`UPDATE homepage_card SET title=?,subtitle=?,description=?, image_id=?, isActived=? WHERE id=?`, [formData.title, formData.subtitle, formData.description, formData.image_id,formData.isActived, id], (err, results, fields) => {
            connection.release();
            if (err) {
                res.status(200).send(err.message);
            } else {
                connection.query(`SELECT * FROM homepage_card WHERE id=?`, [id], (err, results, fields) => {
                    if (err) {
                        res.status(501).send(err.message);
                    } else {
                        res.json(results)
                    }
                });
            }
        });
    });
});

router.delete(url + '/:id', authAdmin, (req, res) => {
    const id = req.params.id;
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT * FROM homepage_card WHERE id=?`, [id], (err, results, fields) => {
            connection.release();
            if (err) {
                res.status(501).send(err.message);
            } else {
                let output = results;
                pool.getConnection(function (err, connection) {
                    connection.query(`DELETE FROM homepage_card WHERE id=?`, [id], (err, results, fields) => {
                        if (err) {
                            res.status(501).send(err.message);
                        } else {
                            res.send(output);
                        }
                    });
                });
            }
        });
    });
});




module.exports = router;