const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // the path to main js / ts file
  entry: { 'main': './src/ts/index.ts' },

  // the file extension webpack is going to look for when importing modules
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },

  // the output directory path and filename
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist'
  },

  // module definitions
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",

            // disable processing files from url() functions in css
            options: {
              url: false
            }
          },
          "sass-loader"
        ]
      },
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        exclude: /node_modules/,
        use: ['babel-loader'],
      }
    ]
  },

  // plugin definitions
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),

    // removes dist folder before every building process
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist']
    })
  ]
}