const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
  },
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{
      from: './*.html'
    }])
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};