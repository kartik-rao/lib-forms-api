var path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'web',
    mode: process.env.NODE_ENV || 'development',
    entry: slsw.lib.entries,
    externals: [nodeExternals()],
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