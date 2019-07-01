var path = require("path");
var webpack = require("webpack");

var HtmlWebpackPlugin = require("html-webpack-plugin");

var babelRc = require("./.babelrc");

module.exports = function (options) {
  return {
    mode: "production",
    entry: {
      bundle: path.resolve(__dirname, "src/extension/index"),
      content: path.resolve(__dirname, "src/content/index"),
      background: path.resolve(__dirname, "src/background/index")
    },
    output: {
      filename: "[name].js",
      sourceMapFilename: "[name].js.map",
      path: path.resolve(__dirname, "dist")
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    module: {
      rules: [{
        test: /\.(png|jp(e*)g|svg)$/,
        exclude: /node_modules/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8000, // Convert images < 8kb to base64 strings
            name: "images/[hash]-[name].[ext]"
          }
        }
      }, {
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
        template: path.resolve(__dirname, "templates", "newtab.html"),
        excludeChunks: ["content", "background"],
        hash: true
      })
    ]
  };
}
