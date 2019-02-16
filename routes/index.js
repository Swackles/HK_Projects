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
            mysql.getClass((err, klasses) => {
                if (err) throw err;
                mysql.getHomework((err, homework) => {
                    if (err) throw err;

                    calander = {};
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

                    for (let i = 0; i < homework.length; i++) {
                        let event = homework[i];

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
                                    if (!(event.name in calander[event.start.getFullYear()][event.start.getMonth()][event.start.getDate()])) {
                                        calander[event.start.getFullYear()][event.start.getMonth()][event.start.getDate()].push(event);
                                    } else {
                                        calander[event.start.getFullYear()][event.start.getMonth()][event.start.getDate()][event.name].homework = event.homework;
                                    }
                                }
                            }
                        }                   
                    }
                    res.render('index', { title: 'login', message: 'Hello there!', calander: calander , klass: klasses});


                    for (let year in calander) {
                        for (let month in calander[year]) {
                            for (let day in calander[year][month]) {
                                for (let klass in calander[year][month][day]) {
                                    let exists = false;
                                    for (let klassInDB in klasses) {
                                        if (klasses[klassInDB].name == calander[year][month][day][klass].name) {
                                            exists = true;
                                        }
                                    }
                                    if (exists) continue;
                                    
                                    mysql.addClass(calander[year][month][day][klass])
                                }
                            }
                        }
                    }
                });
            });            
        }
    });    
});

module.exports = router;
