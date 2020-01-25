/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
const merge = require('webpack-merge');
const NodemonPlugin = require('nodemon-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new NodemonPlugin({
            watch: resolve('./dist'),
            ext: 'js,njk',
        }),
    ],
});
/* eslint-enable @typescript-eslint/no-var-requires */
