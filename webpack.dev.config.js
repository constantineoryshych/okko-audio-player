const path = require("path");
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const loaders = {
	sass: {
		test: /\.sass$/,
		use: [
			"style-loader",
			"css-loader",
			{
				loader: "sass-loader"
			}
		]
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
	},
	js: {
		test: /\.jsx?/,
		exclude: /node_modules/,
		use: ["babel-loader"]
	},
	json: {
		test: /\.json$/,
		use: "json-loader"
	}
};

const config = () => ({
	context: `${__dirname}/source/js/`,
	entry: [
		"babel-polyfill",
		`${__dirname}/source/js/index`,
		`${__dirname}/node_modules/webpack/hot/dev-server`
	],
	output: {
		path: `${__dirname}/static/app/`,
		publicPath: `/static/app/`,
		filename: `main.min.js`
	},
	module: {
		rules: [loaders.sass, loaders.media, loaders.js, loaders.json]
	},
	devServer: {
		contentBase: "./",
		inline: true,
		hot: true,
		historyApiFallback: true
	}
	// plugins: [
	// 	new BundleAnalyzerPlugin({ analyzerPort: ports[name] })
	// ]
});

module.exports = config();