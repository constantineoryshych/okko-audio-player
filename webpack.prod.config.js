const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const map = require("lodash/map");
const fs = require("fs");
const path = require("path");

const nodeModules = {};
fs
	.readdirSync("node_modules")
	.filter(x => [".bin"].indexOf(x) === -1)
	.forEach(mod => {
		nodeModules[mod] = `commonjs ${mod}`;
	});

const loaders = {
	js: {
		test: /\.jsx?/,
		use: "babel-loader"
	},
	json: {
		test: /\.json$/,
		use: "json-loader"
	},
	sass: {
		test: /\.sass$/,
		use: ExtractTextPlugin.extract({
			fallback: "style-loader",
			use: [
				"css-loader",
				{
					loader: "sass-loader"
				}
			]
		})
	},
	media: {
		test: /\.(jpg|jpeg|gif|png|woff|woff2|eot|ttf|svg|otf)$/,
		exclude: /\/node_modules\//,
		use: {
			loader: "file-loader",
			options: {
				name: "style/fonts/[name].[ext]"
			}
		}
	}
};

const config = () => ({
	target: "web",
	entry: ["babel-polyfill", `${__dirname}/source/js/index.js`],
	// entry: [`${__dirname}/source/js/index.js`],
	output: {
		path: `${__dirname}/static/app/`,
		publicPath: `/static/app/`,
		filename: `main.min.js`
	},
	module: {
		rules: [loaders.js, loaders.json]
	},
	plugins: [
		// new ExtractTextPlugin({
		// 	filename: `./style/style.min.css`,
		// 	disable: false,
		// 	allChunks: true
		// }),
		new CopyWebpackPlugin([
			{
				from: `${__dirname}/source/index.html`,
				to: `${__dirname}/static/app/index.html`
			}
		]),
		new MinifyPlugin()
	]
});

const server = () => ({
	target: "node",
	externals: nodeModules,
	context: `${__dirname}/source/server/`,
	entry: ["babel-polyfill", `${__dirname}/source/server/js/index.js`],
	output: {
		path: `${__dirname}/build/`,
		filename: `index.min.js`
	},
	module: {
		rules: [
			{
				test: /\.jsx?/,
				exclude: /\/node_modules\//,
				use: "babel-loader"
			},
			loaders.json
		]
	},
	plugins: [new MinifyPlugin()]
});

module.exports = config();