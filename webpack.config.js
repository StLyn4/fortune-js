const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.min.js',
    publicPath: '',
    library: {
      name: 'FortuneJS',
      type: 'umd',
      export: 'default',
      umdNamedDefine: true,
    },
    globalObject: 'this',
  },
  resolve: {
    fallback: {
      buffer: require.resolve('buffer'),
    },
  },
  mode: 'production',
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.ProvidePlugin({
      Buffer: [require.resolve('buffer'), 'Buffer'],
    }),
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
