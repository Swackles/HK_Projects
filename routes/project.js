const express = require('express');
const fs = require("fs");
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) => {

    fs.readFile(path.join(__dirname, '../projectData.json'), {Encoding: "UTF-8"}, (err, data) => {
        if(err) {
            conole.log(err);
            res.render("error", { message: `Path "${req.url}" dosen't exists`, error: { status: `404` } });
        } else {
            res.render("project", { data: JSON.parse(data) } );
        }
    });
});

router.get('/*', (req, res, next) => {
    let url = req.url.split("/");
    let file = url[url.length - 1];

    res.render(`project-${file}`, {}, (err, html) => {
        if(err) {
            console.log(err);
            res.render("error", { message: `Project "${file}" dosen't exists`, error: { status: `404` } });
        } else {
            res.render(`project-${file}`);
        }
    });
});

module.exports = router;