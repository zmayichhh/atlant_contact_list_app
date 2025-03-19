///<reference types="cypress" />

describe("USE CASE 1 Home page", () => {

  it("TC no. 01: Verify the user can successfully register a new profile.", () => {

    //Kreira random string koji ce biti koristen kao novi email
    const randomString = Math.random().toString(36).substring(2, 10) + "@test.com";

    cy.visit("/");
    cy.contains("Contact List App");
    cy.get(".main-content p").last().should("have.text", "Not yet a user? Click here to sign up!");
    cy.get("#signup").click()

    cy.contains("Add User");
    cy.url().should("include", "/addUser");

    cy.get("#firstName").type("Atlant");
    cy.get("#lastName").type("QA");
    cy.get("#email").type(randomString);
    cy.get("#password").type("1234567")
    cy.contains("Submit").click();

    cy.url().should("include", "/contactList");
    cy.get("h1").should("have.text", "Contact List");

  });

  it("TC no. 02: Verify the user can't register a new profile using invalid inputs.", () => {

    cy.visit("/");
    cy.contains("Contact List App");
    cy.get(".main-content p").last().should("have.text", "Not yet a user? Click here to sign up!");
    cy.get("#signup").click()

    cy.contains("Add User");
    cy.url().should("include", "/addUser");
    cy.get("#error").should("not.be.visible")
    

    cy.contains("Submit").click();
    cy.get("#error").should("be.visible").AND("have.text", "User validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required., email: Email is invalid, password: Path `password` is required.")





    cy.get("#firstName").type("Atlant");
    cy.get("#lastName").type("QA");
    cy.get("#email").type(randomString);
    cy.get("#password").type("1234567")
    cy.contains("Submit").click();

    cy.url().should("include", "/contactList");
    cy.get("h1").should("have.text", "Contact List");

  });


});













/*

describe("USE CASE 2 Contact list page", () => {
  it("passes", () => {
   
  });
});

describe("USE CASE 3 Contact details page", () => {
  it("passes", () => {
  });
});


*/
