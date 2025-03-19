const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://thinking-tester-contact-list.herokuapp.com",
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {},
  },
});
