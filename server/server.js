const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");

const port = 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, "..", "app")));
app.use("/public", express.static(path.resolve(__dirname, "..", "public")));
app.use("/dist", express.static(path.resolve(__dirname, "..", "dist")));
app.use("*", express.static(path.resolve(__dirname, "..", "dist")));
app.use(favicon(path.join(__dirname, "..", "app/favicon.ico")));

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
