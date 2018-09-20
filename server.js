exports.HandleRequest = HandleRequest;

const debug = require("debug");
const http = require("http");
const path = require("path");
const fs = require("fs");

const port = 3000;
const log = debug("*");
const root = "./public";
const index = "/views/Menu/index.html";
const fileNotFindErrorCode = -2;

function HandleRequest(req, res) {
	log("request: %s", req.url);
	let requestedFilePath;

	if (path.extname(req.url) == ".html") {
		requestedFilePath = (req.rul == "/") ? `${root}${index}` : (path.basename(req.url) == "fight.html") ? `${root}/views${req.url}` : `${root}/views/Menu${req.url}`;
	} else {
		requestedFilePath = (req.url == "/") ? `${root}/${index}` : `${root}${req.url}`
	}

	let fileContents;

	try {
		fileContents = fs.readFileSync(requestedFilePath);
	} catch (err) {
		switch (err.errno) {
			case fileNotFindErrorCode:
				res.statusCode = 404;
				break;

			default:
				res.statusCode = 400;
				break;
		}

		log("error: %s", err.message);
		fileContents = err.message;
	}

	res.write(fileContents);
	res.end();
}

const server = http.createServer(HandleRequest);

server.listen(port, () => {
	log("server started on port %s", port);
});
