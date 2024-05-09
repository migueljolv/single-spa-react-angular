const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ContextReplacementPlugin = require("webpack/lib/ContextReplacementPlugin");

const { ModuleFederationPlugin } = webpack.container;
const packageJson = require("./package.json");
const deps = packageJson.dependencies;

module.exports = {
  entry: {
    "root-application": "src/root-application/root-application.js",
  },
  output: {
    publicPath: "auto",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9090,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [path.resolve(__dirname, "apps"), /node_modules/],
        loader: "babel-loader",
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: [path.resolve(__dirname, "apps"), /node_modules/],
      },
    ],
  },
  mode: "development",
  resolve: {
    modules: [__dirname, "node_modules"],
    fallback: {
      fs: false,
      path: false,
    },
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CleanWebpackPlugin(),
    new ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.resolve(__dirname, "../src")
    ),
    new ModuleFederationPlugin({
      name: "single_spa",
      filename: "remoteEntry.js",
      remotes: {
        angular_app: `angular_app@http://localhost:9001/remoteEntry.js`,
        react_app: `react_app@http://localhost:9002/remoteEntry.js`,
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
  ],
  devtool: "source-map",
  externals: [],
};
