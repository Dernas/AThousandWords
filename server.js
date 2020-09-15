'use strict';
const http = require('http');
const fs = require('fs');
process.env.PORT = 8080;
const port = process.env.PORT;


http.createServer(function (req, res) {
    const url = req.url
    if (url === "/") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile("mainPage.html", (err, filedata) => {
            if (err) {
                console.error(err);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('404 - HTML file not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(filedata.toString());
            }
            res.end();
        });
    } else {
        res.end();
    }  
}).listen(port);
