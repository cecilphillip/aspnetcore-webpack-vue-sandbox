// @ts-nocheck
const path = require("path");
const webpack = require("webpack");
const { VueLoaderPlugin } = require('vue-loader');

module.exports = function (env) {
  const isProduction = env === "prod";
  return {
    mode: isProduction ? 'production' : 'development',
    context: path.join(__dirname, "./client"),
    resolve: {
      extensions: [".ts", ".js", '.vue'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    entry: {
      main: "./main"
    },
    output: {
      publicPath: "/",
      path: path.join(__dirname, "./wwwroot"),
      filename: isProduction ? "[name].build.min.js" : "[name].build.js"
    },
    plugins: [
      new VueLoaderPlugin()
    ],
    module: {
      rules: [
        { test: /\.(ts|js)$/, use: { loader: "ts-loader", options: { appendTsSuffixTo: [/\.vue$/] } }, exclude: /node_modules/ },
        { test: /\.vue$/, loader: 'vue-loader', options: {  esModule: true, loaders: {}} },
        { test: /\.html$/, use: [{ loader: 'html-loader', options: { minimize: false } }]}
      ]
    }
  };
};