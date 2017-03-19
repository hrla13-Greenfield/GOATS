const webpack = require('webpack');
const path = require('path');

const DEV = path.resolve(__dirname, 'src');
const OUTPUT = path.resolve(__dirname, 'output');

const config = {
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
  module: {
    loaders: [
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
    ]
  }
};

module.exports = config;
