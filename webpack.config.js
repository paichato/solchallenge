const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./guess.js",
  output: {
    filename: "bundle.js",
    path: path.resolve("./build"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node-modules/",
        use: "babel-loader",
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    // New plugin
    new HtmlWebpackPlugin({
      // injects bundle.js to our new index.html
      inject: true,
      // copys the content of the existing index.html to the new /build index.html
      template: path.resolve("./index.html"),
    }),
  ],
  //   devServer: {
  //     static: {
  //       directory: path.join(__dirname, "public"),
  //     },
  //     compress: true,
  //     port: 9000,
  //   },
};
