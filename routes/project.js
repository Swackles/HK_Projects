const express = require('express');
const fs = require("fs");
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) => {

    fs.readdir(`${__dirname}/../views/`, (err , items) => {
        if (err){
            console.log(err);
            res.render("error", { message: `Unable to get projects`, error: { status: `404` } });
        } else {
            let projects = new Array();

            for(let i = 0; i < items.length; i++) {
                let name = items[i];

                if (name.includes("project-")){
                    let data = fs.readFileSync(`${__dirname}/../views/${name}`, `utf8`);

                    projects.push({
                        Name: data.match(/(?:name="Name" content=")(.*?)(?:"\))/)[1],
                        Description: data.match(/(?:name="Description" content=")(.*?)(?:"\))/)[1],
                        Path: `project/${name.match(/(?:project-)(.*?)(?:.pug)/)[1]}`,
                        Image: "https://via.placeholder.com/350x150"
                    })
                }
            }
            
            res.render("project", { data: projects, title: "Projects"});
        }
    })
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