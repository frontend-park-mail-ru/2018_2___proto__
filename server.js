const debug = require("debug");
const http = require("http");
const fs = require('fs');

const port = 3000;
const log = debug("*");
const root = "./public";
const index = "index.html";

const server = http.createServer(HandleRequest);

server.listen(port, () => {
    log("server started on port %s", port)
});

function HandleRequest(req, res) {
    log("request: %s", req.url);

    const requestedFilePath = (req.url == "/") ? `${root}/${index}` : `${root}${req.url}`;

    fs.readFile(requestedFilePath, (err, file) => {
        if (err) {
            switch (err.errno) {
                case -2:
                    res.statusCode = 404;
                    break;

                default:
                    res.statusCode = 400;
                    break;
            }

            log("error: %s", err.message)
            file = err.message;
        }

        res.write(file);
        res.end();
    });
}