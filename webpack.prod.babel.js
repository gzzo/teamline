import webpack from 'webpack'
import merge from 'webpack-merge'

import common from './webpack.common.babel'
import { getRules } from './webpack-util'

export default merge(common, {
  mode: 'production',

  devtool: 'source-map',

  module: {
    rules: getRules(),
  },

  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      DEBUG: JSON.stringify(false),
    }),
  ],
})
