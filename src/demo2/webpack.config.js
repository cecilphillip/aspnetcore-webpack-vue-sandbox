// @ts-nocheck
const path = require("path");

module.exports = function (env, argv) {
  return {
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
      filename: argv.mode === 'production' ? "[name].build.min.js" : "[name].build.js"
    },
    module: {
      rules: [
        { test: /\.(ts|js)$/, use: { loader: "ts-loader", options: { appendTsSuffixTo: [/\.vue$/] } }, exclude: /node_modules/ },
        { test: /\.html$/, use: [{ loader: 'html-loader', options: { minimize: false } }] }
      ]
    }
  };
};