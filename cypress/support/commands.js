// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

const { random } = require("lodash");

// -- This is a parent command --
    Cypress.Commands.add("openHomepage", () => {
    cy.visit("/");
    cy.viewport("macbook-16");
    cy.contains("Contact List App");
    cy.get(".main-content p").last().should("have.text", "Not yet a user? Click here to sign up!");
  });

  Cypress.Commands.add("validLogin", (randomEmail, randomPassword) => {
    cy.get("#email").type(randomEmail)
    cy.get("#password").type(randomPassword)
    cy.contains("Submit").click()
    
    cy.url().should("include", "/contactList");
    cy.get("h1").should("have.text", "Contact List");
  });



//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })