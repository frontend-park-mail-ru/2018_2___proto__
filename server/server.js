"use strict";

exports.HandleRequest = HandleRequest;

const mime = require("mime-types");
const debug = require("debug");
const http = require("http");
const path = require("path");
const fs = require("fs");

const port = 3000;
const log = debug("*");

const paths = {
	root: "./public",
	index: "./public/index.html",
	favicon: "./public/favicon.ico",
	bundle: "./dict/bundle.js",
};

function HandleRequest(req, res) {
	log(`Request: ${req.url}`);
	let requestedFilePath = "";
	let requestedFileContent;
	let contentType;

	switch (req.url) {
		case "/":
			requestedFilePath = paths.index;
			break;
		case "/favicon.ico":
			requestedFilePath = paths.favicon;
			break;
		case "/bundle.js":
			requestedFilePath = paths.bundle;
			break;
		default:
			requestedFilePath = paths.root + req.url;
			break;
	}

	try {
		requestedFileContent = fs.readFileSync(requestedFilePath);
	} catch (err) {
		res.statusCode = 404;
		log(`Error: ${err.message}`);
		requestedFileContent = err.message;
	} finally {
		contentType = mime.contentType(path.extname(requestedFilePath));
	}

	res.setHeader("Content-Type", contentType);
	res.writeHead(res.statusCode);
	res.write(requestedFileContent);
	res.end();
}

const server = http.createServer(HandleRequest).listen(port, () => {
	log(`Server started on port ${port}`);
});
