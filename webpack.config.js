require("@babel/polyfill");
require("isomorphic-fetch");

// image compression plugins
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');

// plugins for specific image extensions
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // the path to main js / ts file, polyfills, etc.
  entry: ['@babel/polyfill', 'isomorphic-fetch', './src/ts/index.ts'],

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
    rules: [{
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
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env']
        },
      }
    ]
  },

  // plugin definitions
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),

    // (optional) removes dist folder before every building process
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist']
    }),

    // compressess images from assets folder and copies them to the dist folder
    new CopyWebpackPlugin([{
      from: 'assets/**/**',
      to: path.resolve(__dirname, 'dist'),
      cache: true
    }]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      options: {
        optipng: null,
        gifsicle: null,
        svgo: null,
        jpegtran: null
      },
      plugins: [
        imageminMozjpeg({
          quality: 65,
          progressive: true,
          arithmetic: false
        }),
        imageminPngquant({
          quality: [0.5, 0.7],
          floyd: 0.5,
          speed: 2
        }),
        imageminGifsicle({
          interlaced: false,
          optimizationLevel: 2
        })
      ]
    })
  ]
}