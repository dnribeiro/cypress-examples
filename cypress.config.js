const { defineConfig } = require("cypress");
const webpackConfig = require('./webpack.config.js');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    chromeWebSecurity: false,
    baseUrl: "https://www.saucedemo.com",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig
    },
  },
});
