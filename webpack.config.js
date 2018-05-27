const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './app/app.ts',
  output: {
    filename: 'all.js',
    path: path.resolve(__dirname, 'scripts')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [{ test: /\.ts?$/, loader: 'ts-loader' }]
  }
};
