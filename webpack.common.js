const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new ESLintPlugin({
      extensions: ['ts']
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, './src/textures/uv-test-bw.png'), to: path.resolve(__dirname, './dist/uv-test-bw.png') },
        { from: path.resolve(__dirname, './src/textures/uv_grid_opengl.jpg'), to: path.resolve(__dirname, './dist/uv_grid_opengl.jpg') },
        { from: path.resolve(__dirname, './src/textures/lava.jpg'), to: path.resolve(__dirname, './dist/lava.jpg') },
      ],
    }),
  ]
};
