const express = require("express");
const favicon = require("serve-favicon");
const body = require("body-parser");
const cookie = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const uuid = require("uuid/v4");
const debug = require("debug");
const proxy = require("express-http-proxy");

const port = 3000;
const log = debug("*");
const app = express();

const users = {
	"test@test.com": {
		nickname: "test",
		email: "test@test.com",
		password: "qwerty",
		score: 100500,
	},
};

const ids = {};

app.use(morgan("dev"));
app.use(body.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "..", "public")));
app.use("/dist", express.static(path.resolve(__dirname, "..", "dist")));
app.use(favicon(path.join(__dirname, "..", "public/favicon.ico")));
app.use(body.json());
app.use(cookie());
app.use("*", proxy("http://localhost:8080", {
	proxyReqPathResolver: (req) => {
		return req.originalUrl;
	}
}));

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
	res.cookie("session", id, {
		expires: new Date(Date.now() + 1000 * 60 * 10),
	});
	res.status(200).json({ id });
});

app.post("/signin", (req, res) => {
	const nickname = req.body.nickname;
	const password = req.body.password;

	if (!nickname || !password) {
		return res.statusCode(400).json({ code: 400, msg: "Some data are missing" });
	}

	const user = Object.values(users).filter(user => {
		return user.nickname === nickname;
	})[0];

	if (user.password !== password) {
		return res.statusCode(400).json({ code: 400, msg: "Data are incorrect" });
	}

	const id = uuid();
	ids[id] = user.email;
	res.cookie("session", id, {
		expires: new Date(Date.now() + 1000 * 60 * 10),
	});
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

app.get("/leaders/:offset/:limit", (req, res) => {
	res.status(200).json({
		count: 12,
		offset: 0,
		records: [
			{
				nickname: "KOPTEЗ",
				score: 9000,
			},
			{
				nickname: "Armelior",
				score: 11,
			},
			{
				nickname: "avtyul",
				score: 4259,
			},
			{
				nickname: "Vileven",
				score: 4500,
			},
			{
				nickname: "8coon",
				score: 1234,
			},
			{
				nickname: "AlexMally",
				score: 2277,
			},
			{
				nickname: "Geralt of Rivia",
				score: 472,
			},
			{
				nickname: "Mother Fuehrer Gentelman",
				score: 1488,
			},
			{
				nickname: "Adeline Winterhalter",
				score: 282,
			},
			{
				nickname: "Bled Nevelny",
				score: 2018,
			},
			{
				nickname: "Fra Paul",
				score: 7100,
			},
			{
				nickname: "Nagibator1337",
				score: 0,
			},
		],
	});
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
