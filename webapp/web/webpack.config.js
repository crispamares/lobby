var webpack = require('webpack');

module.exports = {
  context: __dirname + "/js/src",
  entry: './index.jsx',
  target: 'atom',
  output: {
    path: __dirname + '/js',
    filename: 'bundle.js', //this is the default name, so you can skip it
  },
  module: {
    loaders: [
      //tell webpack to use babel-loader for all *.jsx files
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel?stage=0"}
    ]
  },
  externals: {
    //don't bundle the 'react' npm package with our bundle.js
    //but get it from a global 'React' variable
    'react': 'React',
    'd3': 'd3',
    'jquery': "jQuery",
    'lodash': "_"
  },
  resolve: {
    root: [__dirname + '/js/lib/', __dirname + '/js/lib/indyva-js/'],
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    // Fix atom build of react-grid-layout: https://github.com/STRML/react-grid-layout/issues/40
    new webpack.NormalModuleReplacementPlugin(/\/react\/lib\/cloneWithProps/, '../../react-clonewithprops/index.js'),
  ],
};
