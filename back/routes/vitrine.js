const express = require('express');
const router = express.Router();
const pool = require('../config.js');
const bodyParser = require('body-parser');
const url = "/vitrine";


 

router.get(url, (req, res) => {
    pool.getConnection(function (err, connection){
        connection.query(`SELECT * FROM vitrine`, (err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                res.status(200).send(results);
            }
            
        });
    });

});


router.get(url + "/:id", (req, res) => {
    const id = req.params.id;
    pool.getConnection(function (err, connection){
        connection.query(`SELECT * FROM vitrine WHERE id=?`,[id], (err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                res.status(200).send(results);
            }
            
        });
    });

});

router.post(url, (req, res) => {
    pool.getConnection(function (err, connection){

        const formData = req.body;
    
        connection.query(`INSERT INTO vitrine (category,type,description) VALUES (?,?,?)`,
        [formData.category, formData.type,formData.description], (err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                const id = results.insertId;
                connection.query(`SELECT * FROM vitrine WHERE id=?`,[id], (err, results, fields) => {
                    if(err){
                        res.status(200).send(err.message);
                    }else{
                        res.json(results)
                    }
                });
            }
        });
    });

});

router.put(url +'/:id', (req, res) => {
    const id = req.params.id;

    pool.getConnection(function (err, connection){
        const formData = req.body;
        
        connection.query(`UPDATE vitrine SET category=?,type=?,description=? WHERE id=?`,[formData.category, formData.type, formData.description, id], (err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                connection.query(`SELECT * FROM vitrine WHERE id=?`,[id], (err, results, fields) => {
                    if(err){
                        res.status(200).send(err.message);
                    }else{
                        res.json(results)
                    }
                });
            }
        });
    });
});

router.delete(url + '/:id', (req, res) => {
    const id = req.params.id;
    pool.getConnection(function (err, connection){
        connection.query(`SELECT * FROM vitrine WHERE id=?`,[id], (err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                let output = results;
                pool.getConnection(function (err, connection){
                    connection.query(`DELETE FROM vitrine WHERE id=?`,[id], (err, results, fields) => {
                        if(err){
                            res.status(200).send(err.message);
                        }else{
                            res.send(output);
                        }
                    });
                });
            }
        });
    });
});

//BBOOOOMMMM
router.delete(url, (req, res) => {
    pool.getConnection(function (err, connection){
        connection.query('TRUNCATE TABLE vitrine',(err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                res.send("BOOOMMMMM");
            }
    });
});
});




module.exports = router;