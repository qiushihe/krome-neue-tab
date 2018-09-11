var path = require("path");
var webpack = require("webpack");

var HtmlWebpackPlugin = require("html-webpack-plugin");

var babelRc = require("./.babelrc");

module.exports = function (options) {
  return {
    mode: "development",
    entry: {
      bundle: path.resolve(__dirname, "src/index")
    },
    output: {
      filename: "[name].[hash].js",
      sourceMapFilename: "[name].[hash].js.map",
      path: path.resolve(__dirname, "dist")
    },
    resolve: {
      extensions: [".js", ".jsx"],
      alias: {
        "/src": path.resolve(__dirname, 'src')
      }
    },
    module: {
      rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelRc
        }
      }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "templates", "newtab.html")
      })
    ]
  };
}
