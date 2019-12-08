const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

process.env.NODE_ENV = 'development'

module.exports = {
  mode: 'development',
  target: 'web',
  devtool: 'cheap-module-source-map', // so that we can see the source code when debugging
  entry: './src/index', //default value
  output: {
    //webpack dev uses memory but we need to specify this anyway
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    stats: 'minimal', //reduces command line noise when it's running,
    overlay: true, //overlay any errors that ocurr in the browser,
    historyApiFallback: true, //all requests will be send to index.html. We can load deep links and will be handled by react router
    disableHostCheck: true, //necessary because of issue with chrome
    headers: { 'Access-Control-Allow-Origin': '*' }, //necessary because of issue with chrome
    https: false, //necessary because of issue with chrome
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify('http://localhost:3001'),
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/favicon.ico',
    }),
  ],
  module: {
    //to tell webpack what files we want to handle
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'], //to run babel on these files
      },
      {
        test: /(\.css)$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
