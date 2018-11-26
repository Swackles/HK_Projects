const fs = require('fs');
const ical = require('ical-generator');

module.exports.day = (date) => {

    date = date.replace('.', "").replace(',', "").replace('<td class="dateline" colspan="5">', "").replace("</td>", "").split(' ');

    var months = ["jaanuar", "veebruar", "märts", "april", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];

    return new Date(parseInt(date[3]), months.indexOf(date[2]), parseInt(date[1]));
}

module.exports.klass = class klass {
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

module.exports.saveIcal = (objectArray) => {
    const cal = ical();
    cal.timezone('Europe/Tallinn');
    cal.method("refresh");
    objectArray.forEach((element) => {
        cal.events([{
            start: element.start,
            end: element.end,
            summary: element.name,
            description: "Klass " + element.nr + ". Opetaja: " + element.teacher,
        }]);
    });

    fs.writeFile('hkCalander.ical', cal, 'utf8');
}