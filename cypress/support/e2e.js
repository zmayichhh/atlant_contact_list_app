// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.

// aktivira cypress metode kao predlozene
///<reference types="cypress" />

// aktivira cypress xpath medote kao predlozene
require("cypress-xpath");

// Import commands.js using ES2015 syntax:
import "./commands";

//Obustavlja pad testove zbog click() problema
Cypress.on("uncaught:exception", () => false);

// sakriva bezpotrebne fetch logove
before(() => {
  cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
});
