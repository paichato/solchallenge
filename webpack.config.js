const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  entry: "./guess.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.uglifyJsMinify,
        // `terserOptions` options will be passed to `uglify-js`
        // Link to options - https://github.com/mishoo/UglifyJS#minify-options
        terserOptions: {},
      }),
    ],
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
    // New plugin
    // new HtmlWebpackPlugin({
    //   // injects bundle.js to our new index.html
    //   // copys the content of the existing index.html to the new /build index.html
    //   template: path.resolve("./index.html"),
    // }),
    // new HtmlWebpackPlugin(),
  ],
  devServer: {
    // contentBase: "./dist",
    //   static: {
    //     directory: path.join(__dirname, "public"),
    //   },
    //   compress: true,
    //   port: 9000,
  },
};
