let webpack = require('webpack');
let path = require('path');

let DEV = path.resolve(__dirname, 'src');
let OUTPUT = path.resolve(__dirname, 'output');

let config = {
  entry: `${DEV  }/index.jsx`,
  output: {
    path: OUTPUT,
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      include: DEV,
      loader: 'babel-loader',
    }],
  },
};

module.exports = config;
