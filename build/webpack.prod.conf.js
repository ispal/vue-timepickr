const webpack = require('webpack');
const base = require('./webpack.base.conf');
const config = require('../config');
const utils = require('./utils');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

base.entry = {
  lib: './src/Timepicker.vue'
};

base.output = {
  path: config.build.assetsRoot,
  publicPath: config.build.assetsPublicPath,
  filename: 'vue-timepickr.js',
  library: 'vue-timepickr',
  libraryTarget: 'umd'
};

base.externals = {
  'vue': 'Vue'
};

base.vue = {
  loaders: utils.cssLoaders({
    sourceMap: config.build.productionSourceMap,
    extract: true
  })
};

var webpackConfig = Object.assign({}, base);

webpackConfig.devtool = '#source-map';
webpackConfig.plugins = (webpackConfig.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new ExtractTextPlugin(utils.assetsPath(base.output.library + '.min.css'))
]);

module.exports = webpackConfig;
