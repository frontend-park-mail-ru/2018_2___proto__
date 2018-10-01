const { assert } = require("chai");
const ResponseMock = require("mock-res");
const server = require("./server.js");

it("Should return 200 on /", () => {
	const res = new ResponseMock();
	server.HandleRequest({ url: "/" }, res);
	assert.equal(200, res.statusCode);
});

it("Should return 200 on index.html", () => {
	const res = new ResponseMock();
	server.HandleRequest({ url: "/index.html" }, res);
	assert.equal(200, res.statusCode);
});

it("Should return 404", () => {
	const res = new ResponseMock();
	server.HandleRequest({ url: "/asd.png" }, res);
	assert.equal(404, res.statusCode);
});

it("Should return application/javascript", () => {
	const res = new ResponseMock();
	server.HandleRequest({ url: "/scripts/index.js" }, res);
	assert.equal("application/javascript; charset=utf-8", res.getHeader("content-type"));
});

it("Should return test/css", () => {
	const res = new ResponseMock();
	server.HandleRequest({ url: "/styles/main.css" }, res);
	assert.equal("text/css; charset=utf-8", res.getHeader("content-type"));
});
