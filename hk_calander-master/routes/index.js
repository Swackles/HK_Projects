const express = require('express');
const router = express.Router();
const getIcal = require('./../genIcal');
const mysql = require('./../mysql');


/* GET home page. */
router.get('/', function (req, res, next) {

    getIcal.run((ical, classes, error) => {
        if (error) {
            console.log(error);
        } else {
            mysql.getClass((result) => {
                console.log(result)
            });
            res.render('index', { title: 'login', message: 'Hello there!', calander: classes });
        }
    });    
});

module.exports = router;
