const server = require('https');
const fs = require('fs');
const path = require('path');

require('./genIcal.js').run();

server.createServer({
    key: fs.readFileSync('keys/server.key'),
    cert: fs.readFileSync('keys/server.crt'),
    rejectUnauthorized: false
    }, (req, res) => {
    console.log("request");
    res.writeHead(200, {
        'Content-Type': 'text/calendar',
        'Content-Length': fs.statSync(path.join(__dirname, 'hkCalander.ical')).size
    });

    fs.createReadStream(path.join(__dirname, 'hkCalander.ical')).pipe(res);
}).listen(8000);

setInterval(() => {require('./genIcal.js').run();}, 14400000);
