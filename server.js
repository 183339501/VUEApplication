
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8089", "webpack/hot/only-dev-server");
config.plugins.push(new webpack.HotModuleReplacementPlugin());

config.devtool = '#source-map';
var proxy = {
 "/api/*": {target: "http://localhost:8088", host: "localhost:8088"},
};


var app = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  proxy : proxy,
  hot: true,
});

app.listen(8089, '0.0.0.0', function (err, result) {
  console.log('http://localhost:8089');
  if (err) {
    console.log(err);
  }
});

