const webpack = require("webpack");
const path = require("path");
const output = path.join(__dirname, "/dist");

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		main: [
			"./public/app.js",
			"./public/styles/main.css",
		]
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
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "public/index.html")
		}),
	]
};