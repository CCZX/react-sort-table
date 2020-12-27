const scss = require('rollup-plugin-scss');

module.exports = {
  rollup(config, options) {
    config.plugins = config.plugins.concat([
      scss(), // will output compiled styles to output.css
    ]);
    return config;
  },
};
