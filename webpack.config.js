const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
module.exports = {
  entry: ["./guess.js"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  optimization: {
    // splitChunks: {
    //   // include all types of chunks
    //   chunks: "all",
    // },
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
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: "/node-modules/",
      //   use: "babel-loader",
      // },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    // New plugin
    new HtmlWebpackPlugin({
      // injects bundle.js to our new index.html
      // copys the content of the existing index.html to the new /build index.html
      template: path.resolve("./index.html"),
    }),
    // new HtmlWebpackPlugin(),
    new BundleAnalyzerPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./assets/"),
          to: path.resolve(__dirname, "build"),
        },
      ],
    }),
  ],
  devServer: {
    writeToDisk: true,
    // contentBase: "./dist",
    //   static: {
    //     directory: path.join(__dirname, "public"),
    //   },
    //   compress: true,
    //   port: 9000,
  },
};
