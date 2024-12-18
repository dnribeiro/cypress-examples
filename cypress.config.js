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
    reporter: 'mochawesome', // Usando o 'mochawesome' como o reporter
    reporterOptions: {
      reportDir: 'cypress/results', // Diretório onde os relatórios serão armazenados
      reportFilename: 'report', // Nome do arquivo de resultado
      overwrite: false, // Sobrescrever o arquivo existente
      html: false, // Gerar relatório HTML (opcional)
      json: true // Gerar relatório JSON 
    },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig
    },
  },
});
