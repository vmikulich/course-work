const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "./web"),
  publicPath: "/categories",
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('css').oneOf(type)))
  },
};

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './assets/styles.min.css'),
      ],
    })
}
