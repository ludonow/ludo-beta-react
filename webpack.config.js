const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const parts = require('./libs/parts');
const path = require('path');
const pkg = require('./package.json');
const validate = require('webpack-validator');
const webpack = require('webpack'); 

const PATHS = {
    build: path.resolve(__dirname, 'build'),
    index: path.resolve(__dirname, 'src', 'js', 'app', 'index.js'),
    images: path.resolve(__dirname, 'src', 'images'),
    imagesbuild: path.resolve(__dirname, 'build', 'images'),
    mainscss: path.resolve(__dirname, 'src', 'stylesheets', 'main.scss'),
    src: path.resolve(__dirname, 'src'),
    style: path.resolve(__dirname, 'src', 'stylesheets')
};

const common = {
    entry: {
        app: [PATHS.index],
        mainscss: [PATHS.mainscss],
        vendor: Object.keys(pkg.dependencies)
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loaders: [ 'react-hot', 'babel?presets[]=es2015,presets[]=react,presets[]=stage-0' ],
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
                test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, 
                loader: "url-loader?mimetype=application/font-woff",
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
        publicPath: '/',
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
                    publicPath: '/',
                    filename: '[name].[chunkhash].js',
                    // This is used for require.ensure. The setup will work without but this is useful to set.
                    chunkFilename: '[chunkhash].js'
                }
            },
            parts.clean(PATHS.build),
            parts.copyImages(PATHS.images, PATHS.imagesbuild),
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
                // devtool: 'source-map'
                devtool: 'eval-source-map'
            },
            parts.copyImages(PATHS.images, PATHS.imagesbuild),
            parts.devServer({
                // Customize host/port here if needed
                host: process.env.HOST,
                port: process.env.PORT
            }),
            parts.setupSCSS(PATHS.mainscss)
        );
}

module.exports = validate(config);