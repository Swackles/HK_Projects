const request = require('request');
const server = require('http').createServer();
const fs = require('fs');
const path = require('path');

const objects = require('./objects');

server.listen(8000);

server.on('request', (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/calendar',
        'Content-Length': fs.statSync(path.join(__dirname, 'hkCalander.ical')).size
    });

    fs.createReadStream(path.join(__dirname, 'hkCalander.ical')).pipe(response);
});

console.log("refresh");
request.post(
    'http://start.hk.tlu.ee/sahtelbeta/tunniplaan/tunniplaan.php',
    {
        form: {
            start: "16.11.2018",
            end: "16.11.2018",
            checked: "0",
            classes: "1",
            subjects: "",
            teachers: "",
            rooms: ""
        }
    },


    (error, response, body) => {
        if (!error && response.statusCode == 200) {

            body = body.replace('<table id="timetable">', '');
            body = body.replace('</table>', '');

            body = body.split("</tr>");

            var classes = [];
            var dateTime = null;

            body.forEach(element => {
                if (element.indexOf("dateline") != -1) {
                    dateTime = objects.day(element);
                } else if (element.indexOf("fields_row") != -1) {
                    klass = new objects.klass(element, dateTime);
                    classes.push(klass);
                }
            });

            objects.saveIcal(classes);

        } else {
            console.log("Error: " + error);
        }
    }
);

setInterval(() => {
    console.log("refresh");
    request.post(
        'http://start.hk.tlu.ee/sahtelbeta/tunniplaan/tunniplaan.php',
        {
            form: {
                start: "16.11.2018",
                end: "16.11.2018",
                checked: "0",
                classes: "1",
                subjects: "",
                teachers: "",
                rooms: ""
            }
        },


        (error, response, body) => {
            if (!error && response.statusCode == 200) {

                body = body.replace('<table id="timetable">', '');
                body = body.replace('</table>', '');

                body = body.split("</tr>");

                var classes = [];
                var dateTime = null;

                body.forEach(element => {
                    if (element.indexOf("dateline") != -1) {
                        dateTime = objects.day(element);
                    } else if (element.indexOf("fields_row") != -1) {
                        klass = new objects.klass(element, dateTime);
                        classes.push(klass);
                    }
                });

                objects.saveIcal(classes);

            } else {
                console.log("Error: " + error);
            }
        }
    );
}, 14400000);
