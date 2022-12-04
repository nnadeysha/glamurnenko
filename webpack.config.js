const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const srcPath = path.resolve(__dirname, 'src')

const filename = ext => (isDev ? `[name].${ext}` : `[name].[hash:8].${ext}`)

const cssLoaders = extra => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader
		},
		'css-loader'
	]

	if (extra) {
		loaders.push(extra)
	}

	return loaders
}

const plugins = () => {
	const base = [
		new CleanWebpackPlugin(),
		new HTMLWebpackPlugin({
			filename: 'index.html',
			template: './index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: '**/*',
					context: srcPath,
					globOptions: {
						ignore: ['**/*.js', '**/*.ts', '**/*.sass', '**/*.html']
					},
					noErrorOnMissing: true,
					force: true
				}
			]
		}),
		new MiniCssExtractPlugin({
			filename: filename('css')
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		})
	]

	return base
}

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: ['./index.js']
	},
	output: {
		filename: filename('js'),
		path: path.resolve(__dirname, 'build')
	},
	resolve: {
		extensions: ['.js', '.json'],
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},

	devServer: {
		port: 3000,
		open: true,
		hot: isDev
	},
	plugins: plugins(),

	module: {
		rules: [
			// Loading CSS
			{
				test: /\.css$/,
				use: cssLoaders(),
				exclude: /\.module\.css$/
			},
			// Loading SCSS/SASS
			{
				test: /\.s[ac]ss$/i,
				use: cssLoaders('sass-loader'),
				exclude: /\.module\.scss$/
			},

			// Loading CSS modules
			{
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							options: {
                publicPath: "../"
              }
						}
					}
				],
				include: /\.module\.css$/
			},
			// Loading SCSS modules
			{
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
              publicPath: "../"
						}
					},
					'sass-loader'
				],
				include: /\.module\.scss$/
			},
		
			
			
		]
	}
}
