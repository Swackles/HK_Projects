const fs = require('fs');
const ical = require('ical-generator');
const request = require('request');

function CreateDateTime(date) {

    date = date.replace('.', "").replace(',', "").replace('<td class="dateline" colspan="5">', "").replace("</td>", "").split(' ');

    var months = ["jaanuar", "veebruar", "märts", "april", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];

    return new Date(parseInt(date[3]), months.indexOf(date[2]), parseInt(date[1]));
}

class klass {
    constructor(text, dateTime) {
        text = text.replace(' class="max_width_250"', '').split("<td>");

        let time = text[1].replace("</td>", "").replace(" - ", ":").split(':');

        dateTime.setHours(time[0]);
        dateTime.setMinutes(time[1]);
        this.start = dateTime;

        dateTime.setHours(time[2]);
        dateTime.setMinutes(time[3]);
        this.end = dateTime;

        this.name = text[2].split(" ")[0] + " " + text[2].split(" ")[1];
        this.teacher = text[4].replace("<br>", "").replace("</td>", "");
        this.nr = text[4].replace("</td>", "");
    }
}

exports.run = () => {
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
            
                fs.writeFile('hkCalander.ical', cal, 'utf8');

                console.log("Ical Updated");
    
            } else {
                console.log("Error: " + error);
            }
        }
    );
}