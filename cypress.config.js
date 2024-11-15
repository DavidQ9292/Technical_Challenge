const { defineConfig } = require('cypress')
const testData = require("./cypress/fixtures/testData.json")

module.exports = defineConfig({
  e2e: {
    supportFile: 'onPrepare.js',
    setupNodeEvents(on, config) {
      const defaultBaseUrl = "https://pocketaces2.github.io/fashionhub";
      const environment = config.env.environment;
      if (environment && testData.environments[environment]) {
        config.baseUrl = testData.environments[environment];
      } else {
        config.baseUrl = defaultBaseUrl;
      }
      return config;
    },
    // Reporter config
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false, // Don't delete previous reports
      html: true, // Generate a HTML
      json: true, // Generate a JSON
    },
  },
});