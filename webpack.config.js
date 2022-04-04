const path = require("path");
module.exports = {
  entry: "./guess.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
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
  //   devServer: {
  //     static: {
  //       directory: path.join(__dirname, "public"),
  //     },
  //     compress: true,
  //     port: 9000,
  //   },
};
