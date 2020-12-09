const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => {
  return {
    entry: [
      '@babel/polyfill', // so we don't need to import it anywhere
      './src'
    ],
    module: {
      rules: [
        { // resolve files ending in jsx
          test: /\.js|.jsx?$/,
          resolve: {
            extensions: ['.js', '.jsx'],
          },
        },
        { // Load JS files
          test: /\.js|.jsx$/,
          exclude: [/node_modules/, /assets/],
          use: {
            loader: 'babel-loader',
          },
        },
        { // Load SCSS files
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        { // Load CSS files
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        { // Load other files
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: [
            'file-loader',
          ],
        },
      ],
    },
    plugins: [
      // Skip the part where we would make a html template
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      // Extract css
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name]-[id].css',
      }),
    ],
  }
}