const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  devtool: "inline-cheap-source-map",
  entry: {
    background: "./src/background.ts",
    content: "./src/content.tsx",
    popup: "./src/popup/popup.tsx",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.module\.s?css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public", to: "." },
        { from: "src/popup/popup.html", to: "." },
      ],
    }),
  ],
};
