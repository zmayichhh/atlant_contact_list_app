
describe("USE CASE 1 Home page", () => {

  it("TC no. 01: Verify the user can successfully register a new profile.", () => {

    cy.visit("https://thinking-tester-contact-list.herokuapp.com/");
    cy.contains("Contact List App");


  });



});















describe("USE CASE 2 Contact list page", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });
});

describe("USE CASE 3 Contact details page", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });
});
