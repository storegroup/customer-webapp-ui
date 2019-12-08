const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackBundleAnalyzer = require('webpack-bundle-analyzer')

process.env.NODE_ENV = 'production'

module.exports = {
  mode: 'production',
  target: 'web',
  devtool: 'source-map', // so that we can see the source code when debugging
  entry: './src/index', //default value
  output: {
    //webpack dev uses memory but we need to specify this anyway
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    // Webpack will automatically display a report of what's in our bundle when the build is completed
    new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    // Users would only need to reload this file when it changes.
    new MiniCssExtractPlugin({
      filename: '[name].[contentHash].css',
    }),
    new webpack.DefinePlugin({
      // This global makes sure React is built in prod mode.
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.API_URL': JSON.stringify('http://localhost:3001'),
    }),
    // It adds reference to the js bundles into the index.html file
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/favicon.ico',
      // To keep our html as small as possible
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
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
        use: [
          MiniCssExtractPlugin.loader, // it will extract our css to a separate file
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader', // this loader will run first
            options: {
              plugins: () => [require('cssnano')], // to minify our css
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
}
