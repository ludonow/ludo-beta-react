const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const parts = require('./libs/parts');
const path = require('path');
const pkg = require('./package.json');
const validate = require('webpack-validator');
const webpack = require('webpack'); 

const PATHS = {
    build: path.resolve(__dirname, 'build'),
    mainscss: path.resolve(__dirname, 'src', 'stylesheets', 'main.scss'),
    routes: path.resolve(__dirname, 'src', 'js', 'app', 'routes.js'),
    src: path.resolve(__dirname, 'src'),
    style: path.resolve(__dirname, 'src', 'stylesheets')
};

const common = {
    entry: {
        app: [PATHS.routes],
        mainscss: [PATHS.mainscss],
        vendor: Object.keys(pkg.dependencies)
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loaders: [ 'react-hot', 'babel?presets[]=es2015,presets[]=react' ],
                include: PATHS.src,
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=100000',
                include: PATHS.src
            },
            { 
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
                loader: "file",
                include: PATHS.src
            },
            { 
                test: /\.(woff|woff2)$/, 
                loader:"url?prefix=font/&limit=5000",
                include: PATHS.src
            },
            { 
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
                loader: "url?limit=10000&mimetype=application/octet-stream",
                include: PATHS.src
            },
            { 
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
                loader: "url?limit=10000&mimetype=image/svg+xml",
                include: PATHS.src
            },
            {
                test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
                loader: 'imports?define=>false&this=>window',
                include: PATHS.src
            }
        ]
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'Ludo' }),
        new webpack.NoErrorsPlugin()
    ]
};

var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(
            common,
            {
                devtool: 'source-map',
                output: {
                    path: PATHS.build,
                    filename: '[name].[chunkhash].js',
                    // This is used for require.ensure. The setup will work without but this is useful to set.
                    chunkFilename: '[chunkhash].js'
                }
            },
            parts.clean(PATHS.build),
            parts.setFreeVariable(
                'process.env.NODE_ENV',
                'production'
            ),
            parts.extractBundle({
                name: 'vendor'
            }),
            parts.minify(),
            parts.extractCSS(PATHS.mainscss),
            parts.purifyCSS([PATHS.mainscss])
        );
    break;
    default:
        config = merge(
            common,
            {
                devtool: 'eval-source-map'
            },
            parts.devServer({
                // Customize host/port here if needed
                host: process.env.HOST,
                port: process.env.PORT
            }),
            parts.setupSCSS(PATHS.mainscss)
        );
}

module.exports = validate(config);