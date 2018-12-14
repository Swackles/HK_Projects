const express = require('express');
const router = express.Router();
const mysql = require('../mysql');

router.post('/class', (req, res, next) => {
    console.log(request.body);

    mysql(request.body, (err, result) => {
        if (err) {
            console.log(err);
            res.statusCode(500).send();
        } else {
            res.statusCode(200).send();
        }
    });
});

module.exports = router;