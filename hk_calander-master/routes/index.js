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
            mysql.getClass((err, klass) => {
                if (err) throw err;
                mysql.getHomework((err, homework) => {
                    if (err) throw err;

                    calander = { }
                    for(let i = 0; i < classes.length; i++) {
                        let event = classes[i];
    
                        if (!(event.start.getFullYear() in calander)) {
                            calander[event.start.getFullYear()] = [];
                            calander[event.start.getFullYear()][event.start.getMonth()] = [];
                            calander[event.start.getFullYear()][event.start.getMonth()][event.start.getDate()] = [ event ];
                        } else {
                            if (!(event.start.getMonth() in calander[event.start.getFullYear()])) {
                                calander[event.start.getFullYear()][event.start.getMonth()] = [];
                                calander[event.start.getFullYear()][event.start.getMonth()][event.start.getDate()] = [ event ];
                            } else {
                                if (!(event.start.getDate() in calander[event.start.getFullYear()][event.start.getMonth()])) {
                                    calander[event.start.getFullYear()][event.start.getMonth()][event.start.getDate()] = [ event ];
                                } else {
                                    calander[event.start.getFullYear()][event.start.getMonth()][event.start.getDate()].push(event);
                                }
                            }
                        }                    
                    }
                    //console.log(homework);

                    for (let i = 0; i < homework.length; i++) {
                        let event = homework[i];

                        
                    }

                    console.log(calander);  

                    res.render('index', { title: 'login', message: 'Hello there!', calander: calander , klass: klass});
                });
            });            
        }
    });    
});

module.exports = router;
