/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./webpack.server.common.js');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin()],
    },
});
/* eslint-enable @typescript-eslint/no-var-requires */
