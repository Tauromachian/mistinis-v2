const path = require("path");

module.exports = {
  mode: "production",
  entry: "./resources/index.js",
  resolve: {
    alias: {
      resource: path.resolve(__dirname, "resources/images"),
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist/",
    filename: "main.js",
    assetModuleFilename: "[name][ext][query]",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg)/,
        type: "asset",
      },
    ],
  },
};
