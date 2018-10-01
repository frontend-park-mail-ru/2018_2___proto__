const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const output = path.join(__dirname, "/dist");

module.exports = {
	entry: {
		main: ["./public/app.js"],
	},
	output: {
		path: output,
		filename: "bundle.js",
	},
	target: "web",
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: "style-loader!css-loader",
			},
			{
				test: /\.hbs$/,
				loader: "handlebars-loader",
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "public/index.html"),
		}),
	],
};
