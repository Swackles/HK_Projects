const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    res.set({ 'Content-Type': 'text/calander' });
    require('./../genIcal').run((calander, error) => {
        if (calander) {
            res.send(calander)
        } else if (error) {
            res.send("error");
        }
    });
});

module.exports = router;
