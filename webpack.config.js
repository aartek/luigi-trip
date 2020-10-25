const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => {
  if (!env) {
    console.error('run webpack with `--env development` or `--env production`')
    throw new Error("env not set")
  }
  console.log(`Running webpack in ${env} mode`)
  return {
    entry: {
      main: './src/main.js',
      settings: './src/settings.js'
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(scss|css)$/,

          use: [{
            loader: 'style-loader'
          },
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [{
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts",
              publicPath: "../fonts" // Added to fix paths to fonts in luigi-css. It's possible that it's not the best solution.
            }
          }]
        }
      ]
    },

    output: {
      chunkFilename: '[name].[chunkhash].js',
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    },
    mode: env,
    devtool: env === 'development' ? 'source-map' : 'none',
    target: 'web',
    plugins: [
      new CleanWebpackPlugin({
        verbose: true
      }),
      new CopyPlugin([{
          from: '**/*.html',
          context: 'src',
        },
          {
            from: '*.svg',
            to: 'assets',
            context: 'src/assets'
          },
          'node_modules/@luigi-project/plugin-auth-oauth2/callback.html',
          {
            from:
              'node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_base_fiori/fonts',
            to: './fonts'
          },
          {
            from:
              'node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_fiori_3/fonts',
            to: './fonts'
          }
        ], {
          copyUnmodified: true //fixes conflict with clean webpack plugin https://github.com/webpack-contrib/copy-webpack-plugin/issues/261#issuecomment-552550859
        }
      ),
      new UglifyJSPlugin({
        sourceMap: env === 'development' ? true : false
      }),
      new HtmlWebpackPlugin({
        inject: true,
        chunks: ['main'],
        template: path.resolve(__dirname, 'src', 'index.html'),
        filename: 'index.html'
      }),
      new HtmlWebpackPlugin({
        inject: true,
        chunks: ['settings'],
        template: path.resolve(__dirname, 'src', 'settings.html'),
        filename: 'settings.html'
      }),
      new MiniCssExtractPlugin({
        filename: "assets/[name].[contenthash].css"
      })
    ],
    resolve: {
      alias: {
        config: path.join(__dirname, 'src', 'config', `routes.${env}.js`)
      }
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            priority: -10,
            test: /[\\/]node_modules[\\/]/
          }
        },

        chunks: 'async',
        minChunks: 1,
        minSize: 30000,
        name: true
      }
    }
  }
};
