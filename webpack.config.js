const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const parts = require('./libs/parts');
const path = require('path');
const pkg = require('./package.json');
const webpack = require('webpack'); 

const PATHS = {
    build: path.resolve(__dirname, 'build'),
    favicon: path.resolve(__dirname, 'src', 'favicon.ico'),
    hideImage: path.resolve(__dirname, 'src', 'hideImage.js'),
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
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        'es2015',
                        'react',
                        'stage-0'
                    ],
                    plugins: ['react-hot-loader/babel']
                },
                include: PATHS.src,
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 100000
                },
                include: PATHS.src
            },
            { 
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'file-loader',
                include: PATHS.src
            },
            { 
                test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, 
                loader: 'url-loader',
                options: {
                    mimetype: 'application/font-woff'
                },
                include: PATHS.src
            },
            { 
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    mimetype: 'application/octet-stream'
                },
                include: PATHS.src
            },
            { 
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    mimetype: 'image/svg+xml'
                },
                include: PATHS.src
            },
            {
                test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
                loader: 'imports-loader',
                options: {
                    define: false,
                    this: 'window'
                },
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
        new HtmlWebpackPlugin({
            minify : {
                collapseWhitespace: true
            },
            // Required
            inject: false,
            template: require('html-webpack-template'),
            // Optional
            appMountId: 'app',
            bodyHtmlSnippet: '<img id="loading" src="../images/loading.svg" />',
            headHtmlSnippet: '<style> body img#loading { display: block; margin: 0 auto; width: 50vw; } </style>',
            meta: [
                {
                    content: 'IE=Edge',
                    'http-equiv': 'X-UA-Compatible',
                },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                {
                    name: 'og:title',
                    content: 'LUDO Now 如荼生活',
                },
                {
                    name: 'og:description',
                    content: 'LUDO 是一種對生活的態度：生活遊戲化。 我們將提供一個平台網站讓生活中的困難點能被有趣地解決',
                },
                {
                    name: 'og:type',
                    content: 'website',
                }
            ],
            scripts: [
                {
                    src: '/hideImage.js',
                    type: 'text/javascript',
                }
            ],
            title: 'Ludo',
        }),
        new webpack.NoEmitOnErrorsPlugin()
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
            parts.copyFiles(PATHS.images, PATHS.imagesbuild),
            parts.copyFiles(PATHS.favicon, PATHS.build),
            parts.copyFiles(PATHS.hideImage, PATHS.build),
            parts.setFreeVariable(
                'process.env.NODE_ENV',
                'production'
            ),
            parts.extractBundle({
                name: 'vendor'
            }),
            parts.minify(),
            parts.extractCSS(PATHS.mainscss)
        );
    break;
    default:
        config = merge(
            common,
            {
                devtool: 'eval-source-map'
            },
            parts.copyFiles(PATHS.images, PATHS.imagesbuild),
            parts.devServer({
                // Customize host/port here if needed
                host: process.env.HOST,
                port: process.env.PORT
            }),
            parts.setupSCSS(PATHS.mainscss)
        );
}

module.exports = config;