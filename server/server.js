const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const cors = require("cors");

const port = 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, "..", "public")));
app.use("/dist", express.static(path.resolve(__dirname, "..", "dist")));
app.use(favicon(path.join(__dirname, "..", "public/favicon.ico")));
app.use(cors({
	origin: true,
	credentials: true,
	methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
	allowedHeaders: ["Content-Type"],
}));

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
