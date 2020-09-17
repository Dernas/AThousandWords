'use strict';
const http = require('http');
const fs = require('fs');
process.env.PORT = 8080;
const port = process.env.PORT;


const parseUrl = url => {
    const fixedUrl = "localhost:8080" + url //create a full url to pass to URL
    const newUrl = new URL(fixedUrl) //so we can use URL.search property
    const parsedUrl = new URLSearchParams(newUrl.search)
    let ourWord = parsedUrl.get("word")
    ourWord = ourWord.replace(/\s+/g, '')
    const literal = url.includes("literal")
    return [ourWord, literal]
}

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
    } else if (url.includes("sword")){ //todo api version
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const data = parseUrl(url) //todo: use literal
        res.write('Turn back. This is no place for the living.');
        res.end();
    } else if (url.includes("word")){ //local version
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile("wordPage.html", (err, filedata) => {
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
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 - Page not found');
        res.end();
    }  
}).listen(port);
