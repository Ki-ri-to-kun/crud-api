const path = require('node:path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'production',
  entry: './src/main.ts',
  target: 'node',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
    {
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      "path": false,
      "http": false,
      "crypto": false,
      "os": false
    }
  },
  plugins: [
    new Dotenv()
  ]
};