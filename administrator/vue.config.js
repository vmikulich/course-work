const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  outputDir: path.resolve(__dirname, "./web"),
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
  },
};

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './theme/styles.min.css'),
      ],
    })
}
