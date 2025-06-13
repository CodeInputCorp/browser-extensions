const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  devtool: "inline-cheap-source-map",
  entry: {
    background: "./src/background.ts",
    content: "./src/content.ts",
    popup: "./src/popup/popup.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public", to: "." },
        { from: "src/popup/popup.html", to: "." },
        { from: "src/popup/style.css", to: "." },
      ],
    }),
  ],
};
