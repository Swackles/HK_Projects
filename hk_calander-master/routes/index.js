const express = require('express');
const router = express.Router();
const getIcal = require('./../genIcal');
const mysql = require('./../mysql');


/* GET home page. */
router.get('/', (req, res, next) => {

    getIcal.run((ical, classes, error) => {
        if (error) {
            console.log(error);
        } else {
            mysql.getClass((result) => {
                res.render('index', { title: 'login', message: 'Hello there!', calander: classes , klass: result});
            });            
        }
    });    
});

module.exports = router;
