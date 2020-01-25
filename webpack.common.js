/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './src/bootstrap/index',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    node: {
        __dirname: true,
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts/,
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: 'ts-loader',
            },
        ],
    },
    plugins: [new CopyPlugin([{ from: './src/views', to: './views' }])],
    resolve: {
        extensions: ['.ts', '.js'],
    },
    optimization: {
        noEmitOnErrors: true,
    },
};
/* eslint-enable @typescript-eslint/no-var-requires */
