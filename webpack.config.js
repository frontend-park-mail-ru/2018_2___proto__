const path = require("path");

const output = path.join(__dirname, "/app");

module.exports = {
	entry: {
		main: ["./app/index.js"],
	},
	output: {
		path: output,
		filename: "bundle.js",
	},
	target: "web",
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				loader: "style-loader!css-loader!sass-loader",
			},
			{
				test: /\.hbs$/,
				loader: "handlebars-loader",
			},
			{
				test: /\.ts$/,
				loader: "ts-loader",
			},
		],
	},
};
