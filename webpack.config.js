module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './app/app.ts',
  output: {
    filename: 'scripts/all.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [{ test: /\.ts?$/, loader: 'ts-loader' }]
  }
};
