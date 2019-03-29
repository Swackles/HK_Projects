const express = require('express');
const fs = require("fs");
const router = express.Router();
const path = require('path');
const app = require('./../app');

function getProjects(callback) {
    fs.readdir(`${__dirname}/../views/projects/`, (err , items) => {
        if (err){
            console.log(err);
            res.render("error", { message: `Unable to get projects`, error: { status: `404` } });
        } else {
            let projects = new Array();

            for(let i = 0; i < items.length; i++) {
                let name = items[i];

                if (name == "layout.pug") continue;
                let data = fs.readFileSync(`${__dirname}/../views/projects/${name}`, `utf8`);

                projects.push({
                    Name: data.match(/meta\(name="Name" content="(.*?)"\)/)[1],
                    Description: data.match(/meta\(name="Description" content="(.*?)"\)/)[1],
                    Path: `project/${name.match(/(.*?).pug/)[1]}`,
                    Image: "https://via.placeholder.com/350x150"
                });
            }
            callback(projects);
        }
    });
}

router.get('/', (req, res, next) => {
    getProjects((projects) => {
        res.render("project", { data: projects, title: "Projects"});
    });
});

router.get('/list', (req, res, next) => {
    getProjects((projects) => {
        res.send(JSON.stringify(projects));
    });
});

router.get('/*', (req, res, next) => {
    let url = req.url.split("/");
    let file = url[url.length - 1];

    getProjects((projects) => {
        app.set("views", path.join(__dirname, './../views/projects'));
        console.log(file);
        res.render(`${file}`, { data: projects, title: projects.find(x => x.Path === `project/${file}` ).Name}, (err, html) => {
            if(err) {
                console.log(err);
                app.set("views", path.join(__dirname, './../views'));
                res.render("error", { message: `Project "${file}" dosen't exists`, error: { status: `404` } });
            } else {
                res.send(html);
            }
        });
        app.set("views", path.join(__dirname, './../views'));
    });
});

module.exports = router;