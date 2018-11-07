const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const output = path.join(__dirname, "/dist");

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

	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "app/index.html"),
		}),
	],
};
