///<reference types="cypress" />

describe("USE CASE 1 Home page", () => {

  //Kreira random string koji ce biti koristen kao novi email
  const randomEmail = Math.random().toString(36).substring(2, 10) + "@test.com";
  const randomPassword = Math.random().toString(36).substring(2, 10) + "1234";

  it("TC no. 01: Verify the user can successfully register a new profile.", () => {

    cy.visit("/");
    cy.contains("Contact Ligst App");
    cy.get(".main-content p").last().should("have.text", "Not yet a user? Click here to sign up!");
    cy.get("#signup").click()

    cy.contains("Add User");
    cy.url().should("include", "/addUser");

    cy.get("#firstName").type("Atlant");
    cy.get("#lastName").type("QA");
    cy.get("#email").type(randomEmail);
    cy.get("#password").type(randomPassword)
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
    cy.get("#error").should("be.visible").AND("include.text", "User validation failed:")

    cy.get("#firstName").type("Atlant");
    cy.contains("Submit").click();
    cy.get("#error").should("be.visible").AND("include.text", "User validation failed: lastName: Path `lastName` is required.")

    cy.get("#firstName").clear()
    cy.get("#lastName").type("QA");
    cy.contains("Submit").click();
    cy.get("#error").should("be.visible").AND("include.text", "User validation failed: firstName: Path `firstName` is required.")

    cy.get("#firstName").type("test")
    cy.get("#lastName").clear().type("test")
    cy.get("#password").type("123456")
    cy.contains("Submit").click();
    cy.get("#error").should("be.visible").AND("have.text", "User validation failed: email: Email is invalid")

  });

  it("TC no. 03: Verify user can't register a profile with an existing email address.", () => {

    cy.visit("/");
    cy.contains("Contact Ligst App");
    cy.get(".main-content p").last().should("have.text", "Not yet a user? Click here to sign up!");
    cy.get("#signup").click()

    cy.contains("Add User");
    cy.url().should("include", "/addUser");

    cy.get("#firstName").type("Atlant");
    cy.get("#lastName").type("QA");
    cy.get("#email").type(randomEmail);
    cy.get("#password").type("1234567")

    cy.contains("Submit").click();
    cy.get("#error").should("be.visible").AND("have.text", "Email address is already in use")
    cy.url().should("include", "/addUser");
    
  });

  it("TC no. 04: Verify the user can successfully log in using an existing profile.", () => {

    cy.visit("/");
    cy.contains("Contact Ligst App");
    cy.get("#email").type(randomEmail)
    cy.get("#password").type(randomPassword)
    cy.contains("Submit").click()
    
    cy.url().should("include", "/contactList");
    cy.get("h1").should("have.text", "Contact List");

  });

  it("TC no. 05: Verify the user can't log in using invalid inputs.", () => {

   


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
