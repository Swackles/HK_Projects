const express = require('express');
const router = express.Router();
const mysql = require('../mysql');

router.post('/class', (req, res, next) => {
    console.log(req.body);

    mysql.addHomeowork  (req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;