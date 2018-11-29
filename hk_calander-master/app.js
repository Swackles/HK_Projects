const server = require('https').createServer();
const fs = require('fs');
const path = require('path');

require('./genIcal.js').run();

server.listen({
    host: "localhost",
    port: "8000",
    exclusive: true
});

console.log(server);

server.on('request', (request, response) => {
    console.log("request");
    response.writeHead(200, {
        'Content-Type': 'text/calendar',
        'Content-Length': fs.statSync(path.join(__dirname, 'hkCalander.ical')).size
    });

    fs.createReadStream(path.join(__dirname, 'hkCalander.ical')).pipe(response);
});

setInterval(() => {require('./genIcal.js').run();}, 14400000);
