module.exports = {
    outputDir: '../wwwroot',
    // Include Vue runtime + compiler since we're using Vue directly within Razor
    runtimeCompiler: true,
    chainWebpack: config => {
        // disable generation of index.html to outputDir
        config.plugins.delete('html');
        config.plugins.delete('preload');
        config.plugins.delete('prefetch');
    }
};