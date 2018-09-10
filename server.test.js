const server = require("./server.js");
const assert = require("chai").assert;
const responseMock = require("mock-res");

it("should return 200", function() {
	let res = new responseMock();
	server.HandleRequest({ url: "/" }, res);
	assert.equal(200, res.statusCode);
});

it("should return 200", function() {
	let res = new responseMock();
	server.HandleRequest({ url: "/views/index.html" }, res);
	assert.equal(200, res.statusCode);
});

it("should return 404", function() {
	let res = new responseMock();
	server.HandleRequest({ url: "../asd.png" }, res);
	assert.equal(404, res.statusCode);
});
