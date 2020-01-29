/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge');

const common = require('./webpack.client.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
});
/* eslint-enable @typescript-eslint/no-var-requires */
