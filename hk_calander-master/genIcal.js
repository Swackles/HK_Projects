const fs = require('fs');
const ical = require('ical-generator');
const request = require('request');

function CreateDateTime(date) {

    date = date.split(/<(?:.|\n)*?>/gm);

    var months = ["jaanuar", "veebruar", "märts", "april", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];

    return new Date(parseInt(date[3]), months.indexOf(date[2]), parseInt(date[1]));
}

class klass {
    constructor(text, dateTime) {

        text = text.split(/<(?:.|\n)*?>/gm).filter((value, index, arr) => {
            return value != "" && value != " " && value != "[" && value != "]";
        });

        console.log(text);

        let time = text[0].split(" - ");

        this.start = dateTime.setHours(time[0].split(":")[0]);

        console.log(time);
    }
}

exports.run = (callback) => {
    request.post('http://start.hk.tlu.ee/sahtelbeta/tunniplaan/tunniplaan.php',
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
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
    
                body = body.replace('<table id="timetable">', '');
                body = body.replace('</table>', '');
    
                body = body.split("</tr>");
    
                var classes = [];
                var dateTime = null;
    
                body.forEach(element => {
                    if (element.indexOf("dateline") != -1) {
                        dateTime = CreateDateTime(element);
                    } else if (element.indexOf("fields_row") != -1) {
                        let tund = new klass(element, dateTime);
                        classes.push(tund);
                    }
                });
    
                const cal = ical();
                cal.timezone('Europe/Tallinn');
                cal.method("refresh");
                classes.forEach((element) => {
                    cal.events([{
                        start: element.start,
                        end: element.end,
                        summary: element.name,
                        description: "Klass " + element.nr + ". Opetaja: " + element.teacher,
                    }]);
                });

                callback(cal, classes, null);
    
            } else {
                callback(null, null, "error");
            }
        }
    );
}