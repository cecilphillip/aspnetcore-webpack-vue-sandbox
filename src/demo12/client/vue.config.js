/// <reference types="node" />
const ChainableWebpackConfig = require("webpack-chain");

module.exports = {
    outputDir: '../wwwroot',
    // Include Vue runtime + compiler since we're using Vue directly within Razor
    runtimeCompiler: true,

    /** @type {(config:ChainableWebpackConfig) => void} */
    chainWebpack: config => {
        config.entryPoints.delete('app');
        config.entry('main').add('./src/main.ts');
        config.output.when(process.env.NODE_ENV === 'production',
            config => config.filename('[name].build.min.js'),
            config => config.filename('[name].build.js')
        );
    }
};