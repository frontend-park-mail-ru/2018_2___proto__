const express = require("express");
const favicon = require("serve-favicon");
const body = require("body-parser");
const cookie = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const uuid = require("uuid/v4");

const port = 3000;
const app = express();
const users = {};
const ids = {};

app.use(morgan("dev"));
app.use(body.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "..", "public")));
app.use(favicon(path.join(__dirname, "..", "public/favicon.ico")));
app.use(body.json());
app.use(cookie());

// POST
app.post("/signup", (req, res) => {
	const nickname = req.body.nickname;
	const email = req.body.email;
	const password = req.body.password;

	if (!nickname || !email || !password) {
		return res.statusCode(400).json({ code: 400, msg: "Some data are missing" });
	}

	if (users[email]) {
		return res.statusCode(400).json({ code: 400, msg: "User already exists" });
	}

	const id = uuid();
	ids[id] = email;
	res.cookie("session", id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
	res.status(200).json({ id });
});

// Не работает
app.post("/signin", (req, res) => {
	const nickname = req.body.nickname;
	const password = req.body.password;

	if (!nickname || !password) {
		return res.statusCode(400).json({ code: 400, msg: "Some data are missing" });
	}

	if (!users[email] || users[email].password !== password) {
		return res.statusCode(400).json({ code: 400, msg: "Data are incorrect" });
	}

	const id = uuid();
	ids[id] = email;
	res.cookie("session", id, { expires: new Data(Date.now() + 1000 * 60 * 10) });
	res.status(200).json({ id });
});

// GET
app.get("/user", (req, res) => {
	const id = res.cookies.sessionid;
	const email = ids[id];
	if (!users[email] || !email) {
		return res.statusCode(401).json({ code: 401, msg: "No such user" });
	}

	res.status(200).json(users[email]);
});

app.get("/leaders", (req, res) => {
	// Not implemented
});

// PUT
app.put("/user", (req, res) => {
	const id = req.cookies.sessionid;
	const email = ids[id];
	const nickname = req.body.nickname;
	const password = req.body.password;

	if ((!nickname || !(oldNickname === newNickname)) && !password) {
		return res.statusCode(304).json({ code: 304, msg: "Not modified" });
	} else {
		users[email].nickname = nickname;
		users[email].password = password;
	}

	return res.statusCode(200).json(users[email]);
});

// DELETE
app.delete("/logout", (req, res) => {
	res.clearCookie("session").status(200).end();
});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
