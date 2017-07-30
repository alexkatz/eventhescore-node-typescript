const webpack = require('webpack');
const path = require('path');
const package = require('./package.json');
const { CheckerPlugin } = require('awesome-typescript-loader');

const isProduction = process.argv.indexOf('--production') >= 0 || process.argv.indexOf('-p') >= 0;
const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './dist');

module.exports = {
    context: sourcePath,
    entry: {
        main: './server.ts',
    },
    devtool: !isProduction ? 'inline-source-map' : false,
    output: {
        path: outPath,
        publicPath: '/',
        filename: 'server.js',
    },
    target: 'node',
    resolve: {
        extensions: ['.ts'],
        // Fix webpack's default behavior to not load packages with jsnext:main module
        // https://github.com/Microsoft/TypeScript/issues/11677
        mainFields: ['main'],
    },
    module: {
        loaders: [
            {
                test: /\.ts/,
                use: 'awesome-typescript-loader',
            },
            {
                test: /\.ts/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    configFile: 'tslint.json',
                    tsConfigFile: 'tsconfig.json',
                },
            },
        ],
    },
    plugins: [
        new CheckerPlugin(),
    ],
};