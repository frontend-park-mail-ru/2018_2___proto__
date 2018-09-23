"use strict";

const server = require("./server.js");
const assert = require("chai").assert;
const responseMock = require("mock-res");

it("Should return 200 on /", () => {
	let res = new responseMock();
	server.HandleRequest({ url: "/" }, res);
	assert.equal(200, res.statusCode);
});

it("Should return 200 on index.html", () => {
	let res = new responseMock();
	server.HandleRequest({ url: "/index.html" }, res);
	assert.equal(200, res.statusCode);
});

it("Should return 404", () => {
	let res = new responseMock();
	server.HandleRequest({ url: "/asd.png" }, res);
	assert.equal(404, res.statusCode);
});

it("Should return application/javascript", () => {
	let res = new responseMock();
	server.HandleRequest({ url: "/scripts/index.js" }, res);
	assert.equal("application/javascript; charset=utf-8", res.getHeader("content-type")
	);
});

it("Should return test/css", () => {
	let res = new responseMock();
	server.HandleRequest({ url: "/styles/main.css" }, res);
	assert.equal("text/css; charset=utf-8", res.getHeader("content-type"));
});
