var path = require('path');
const env = process.env.NODE_ENV || 'development';
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
    mode: env,
    entry: {
        main: path.join(__dirname, 'src/api.graphql.ts')
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.(ts)$/,
                use: {
                    loader: 'awesome-typescript-loader',
                    options : {
                        bail: true,
                        useCache: true,
                        reportFiles: [
                            'src/**/*.{ts}'
                        ],
                        compilerOptions: {
                            module: 'esnext',
                            allowJs: true,
                            declaration: false,
                        }
                    }
                },
                exclude: /node_modules/
            },
        ]
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'lib')
    },
    watchOptions: {
        ignored: /node_modules/
    },
    resolve: {
        extensions: ['.ts']
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new CheckerPlugin()
    ]
};