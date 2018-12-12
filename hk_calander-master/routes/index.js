const express = require('express');
const router = express.Router();
const getIcal = require('./../genIcal');


/* GET home page. */
router.get('/', function (req, res, next) {

    getIcal.run((ical, classes, error) => {
        if (error) {
            console.log(error);
        } else {
        }
    });

    res.render('index', { title: 'login', message: 'Hello there!' })
});

module.exports = router;
