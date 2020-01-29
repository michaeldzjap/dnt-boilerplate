/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        app: './src/assets/js/app',
        styles: './src/assets/sass/app',
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'public/js'),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [new MiniCssExtractPlugin({ filename: '../css/[name].css' })],
    resolve: {
        extensions: ['.js', '.scss'],
    },
    optimization: {
        noEmitOnErrors: true,
    },
};
/* eslint-enable @typescript-eslint/no-var-requires */
