import webpack from 'webpack'
import merge from 'webpack-merge'

import common from './webpack.common.babel'
import { getRules } from './webpack-util'

export default merge(common, {
  mode: 'development',

  output: {
    filename: '[name].[hash].js',
  },

  devtool: 'cheap-module-source-map',

  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
  },

  module: {
    rules: getRules(),
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      DEBUG: JSON.stringify(true),
    }),
  ],
})
