var webpack = require("webpack");
var vue = require("vue-loader");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var cssLoader = ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!postcss-loader");

var publicPath = "/build/";

module.exports = {
  entry: {
    app: ["vue", "vue-router","./js/index.js"]
  },

  output: {
    path: __dirname + publicPath,
    filename: 'app.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: function(info) {//开发环境调试使用
      return info.resource;
    }
  },

  module: {
    loaders: [
      {test: /\.vue$/, loader: vue.withLoaders({css: cssLoader})},
      {test: /\.css$/, loader: cssLoader},
    ]
  },

  plugins: [
      new ExtractTextPlugin("app.css", {disable: false}),
      new webpack.optimize.CommonsChunkPlugin("common.js")
      // new webpack.optimize.UglifyJsPlugin({//代码压缩
      //     compress: {
      //         warnings: false
      //     }
      // })
  ],

  postcss: function () {
    // use webpack context
    var postcssImport = require('postcss-import');

    return [
      postcssImport({
        onImport: function (files) {
          files.forEach(this.addDependency);
        }.bind(this)
      }),
      require('postcss-custom-properties'),
    ]
  }
};
