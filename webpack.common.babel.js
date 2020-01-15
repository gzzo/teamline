import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import InlineSourcePlugin from 'html-webpack-inline-source-plugin'

export default {
  context: path.resolve(__dirname, 'src'),

  entry: ['whatwg-fetch', './index.js'],

  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: false,
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          test: /node_modules/,
          priority: 20,
        },
      },
    },
  },

  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inlineSource: 'runtime.+\\.js',
    }),
    new InlineSourcePlugin(),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules'),
    ],
  },
}
