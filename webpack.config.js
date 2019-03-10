var path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: slsw.lib.entries,
    target: 'node',
    externals: [nodeExternals()],
    mode: process.env.NODE_ENV,
    module: {
        rules: [{
            test: /\.json$/,
            use: { loader: 'json' }
        },
        {
            test: /\.ts(x?)$/,
            use: { loader: 'ts-loader' }
        }],
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, 'dist/'),
        filename: '[name].js'
    }
};