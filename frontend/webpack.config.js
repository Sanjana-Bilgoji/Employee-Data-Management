const path = require('path');

module.exports = {
  entry: './index.js',
  mode: 'development',
  devServer: {
    static: './',
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  resolve: { extensions: ['.js', '.jsx'] }
};
