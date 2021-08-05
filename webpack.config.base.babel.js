import path from "path";

import CopyWebpackPlugin from "copy-webpack-plugin";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
// import DotenvPlugin from 'dotenv-webpack';
import DuplicatePackageCheckerPlugin from "duplicate-package-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ProgressBarWebpackPlugin from "progress-bar-webpack-plugin";
import InterpolateHtmlPlugin from "interpolate-html-plugin";

const devMode = process.env.NODE_ENV !== "production";

export default {
  // The base directory, an absolute path, for resolving entry points and loaders from configuration
  context: path.resolve(__dirname),

  // Get mode from NODE_ENV
  mode: process.env.NODE_ENV,

  // Determine how the different types of modules within a project will be treated
  module: {
    rules: [
      // Use babel-loader for ts(x) files
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      // Use a list of loaders to load materialize and prism css files
      {
        test: /\.css$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: !devMode,
              modules: true,
              importLoaders: 1,
            },
          },
        ],
      },
      // Webpack cofiguration for babel-loader with Swiper and Dom7:
      {
        test: /\.js$/, // Check for all js files
        exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
        loader: "babel-loader",
      },
      // Use image-webpack-loader and url-loader to load images
      {
        test: /\.(png|jpe?g|gif|svg|webp|tiff)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: { limit: 10000, name: "[name].[ext]" },
          },
          { loader: "image-webpack-loader", options: { disable: devMode } },
        ],
      },
    ],
  },
  // A list of used webpack plugins
  plugins: [
    // Enforces case sensitive paths.
    new CaseSensitivePathsPlugin(),
    // Supports dotenv file
    // new DotenvPlugin(),
    // Warns when multiple versions of the same package exist in a build
    new DuplicatePackageCheckerPlugin(),

    // Extract css part from javascript bundle into separated file
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:10].css",
      chunkFilename: "[name].[contenthash:10].css",
    }),
    // Better building progress display
    new ProgressBarWebpackPlugin(),
    // Generate html file to dist folder
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      favicon: path.resolve(__dirname, "public/favicon.ico"),
    }),

    // Copy static files to build dir
    new CopyWebpackPlugin([
      {
        from: "public",
        to: "public",
        ignore: ["index.html", "favicon.ico"],
      },
    ]),

    new InterpolateHtmlPlugin({
      PUBLIC_URL: "static", // can modify `static` to another name or get it from `process`
    }),
  ],

  // Change how modules are resolved
  resolve: {
    // What directories should be searched when resolving modules
    modules: ["node_modules", "src"],
    // Automatically resolve certain extensions (Ex. import 'folder/name(.ext)')
    extensions: [".js", ".jsx", ".json", ".css", ".scss"],
  },
};
