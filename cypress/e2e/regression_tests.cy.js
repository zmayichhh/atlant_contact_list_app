///<reference types="cypress" />

  //Creates random strings for the email and password that will be used inside the tests
  const randomEmail = Math.random().toString(36).substring(2, 10) + "@test.com";
  const randomPassword = Math.random().toString(36).substring(2, 10) + "1234";


describe("USE CASE 1 Home page", () => {


  it("TC no. 01: Verify the user can successfully register a new profile.", () => {

    cy.visit("/");
    cy.viewport("macbook-16");
    cy.contains("Contact List App");
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
    cy.contains("Contact List App");
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
    cy.contains("Contact List App");
    cy.get("#email").type(randomEmail)
    cy.get("#password").type(randomPassword)
    cy.contains("Submit").click()
    
    cy.url().should("include", "/contactList");
    cy.get("h1").should("have.text", "Contact List");

  });

  it("TC no. 05: Verify the user can't log in using invalid inputs.", () => {

    cy.visit("/");
    cy.contains("Contact List App");
    cy.contains("Submit").click()
    cy.get("#error").should("be.visible").AND("have.text", "Incorrect username or password");

    cy.get("#email").type("invalid")
    cy.contains("Submit").click()
    cy.get("#error").should("be.visible").AND("have.text", "Incorrect username or password");

    cy.get("#email").clear()
    cy.get("#password").type("invalid")
    cy.contains("Submit").click()
    cy.get("#error").should("be.visible").AND("have.text", "Incorrect username or password");

  });

  it("TC no. 06: Verify the user can successfully log out.", () => {

    cy.visit("/");
    cy.contains("Contact List App");
    cy.get("#email").type(randomEmail)
    cy.get("#password").type(randomPassword)
    cy.contains("Submit").click()
    
    cy.url().should("include", "/contactList");
    cy.get("h1").should("have.text", "Contact List");

    cy.contains("Logout").click()
    cy.contains("Contact List App");
    cy.url().should("not.include", "/contactList");

  });

  it("TC no. 07: Verify the user can cancel the Sign in page.", () => {

    cy.visit("/");
    cy.contains("Contact List App");
    cy.get(".main-content p").last().should("have.text", "Not yet a user? Click here to sign up!");
    cy.get("#signup").click()

    cy.contains("Add User");
    cy.url().should("include", "/addUser");

    cy.contains("Cancel").click()
    cy.contains("Contact List App");
    cy.url().should("not.include", "/addUser");


  });

});



describe("USE CASE 2 Contact list page", () => {

  const newContact = {
    firstName: "Test",
    lastName: "Tester",
    birthday:"1996/04/13",
    email: randomEmail,
    phone:"1234567",
    address:"Milana Preloga",
    city:"Sarajevo",
    province:"Sarajevo",
    postal_code:"71000",
    country:"BiH"
  }

  it("TC no. 01: Verify the user can successfully add a new contact with mandatory fields.", () => {

    //Precondition: Execute TC no. 04 from USE CASE 1
    cy.visit("/");
    cy.viewport("macbook-16");
    cy.contains("Contact List App");
    cy.get("#email").type(randomEmail)
    cy.get("#password").type(randomPassword)
    cy.contains("Submit").click()
    
    cy.url().should("include", "/contactList");
    cy.get("h1").should("have.text", "Contact List");

    //Gets the number of current rows
    cy.get("table tr").then((rowElements) => {

    cy.get("p button").click()
    cy.url().should("include", "/addContact");
    cy.get("h1").should("have.text", "Add Contact");
    cy.get("#firstName").type(newContact.firstName)
    cy.get("#lastName").type(newContact.lastName)
    cy.contains("Submit").click()

    cy.url().should("include", "/contactList");
    cy.get("table .contactTableBodyRow")
    .find("td")
    .eq(1).
    should("have.text", newContact.firstName +" "+ newContact.lastName)

    });
   
  });
  
  it("TC no. 02: Verify the user can successfully add a new contact with all fields.", () => {

       //Precondition: Execute TC no. 04 from USE CASE 1
       cy.visit("/");
       cy.viewport("macbook-16");
       cy.contains("Contact List App");
       cy.get("#email").type(randomEmail)
       cy.get("#password").type(randomPassword)
       cy.contains("Submit").click()
       
       cy.url().should("include", "/contactList");
       cy.get("h1").should("have.text", "Contact List");
   
       cy.get("p #add-contact").should("be.visible").click()
       cy.url().should("include", "/addContact");
       cy.get("h1").should("have.text", "Add Contact");

       cy.get("#firstName").type(newContact.firstName)
       cy.get("#lastName").type(newContact.lastName)
       cy.get("#birthdate").type(newContact.birthday)
       cy.get("#email").type(newContact.email)
       cy.get("#phone").type(newContact.phone)
       cy.get("#street1").type(newContact.address)
       cy.get("#city").type(newContact.city)
       cy.get("#stateProvince").type(newContact.province)
       cy.get("#postalCode").type(newContact.postal_code)
       cy.get("#country").type(newContact.country)
       cy.contains("Submit").click()

       cy.url().should("include", "/contactList");


       cy.get("table .contactTableBodyRow").last().within(() => {

  for (let i=0; i<8; i++) {
       for (let j=0; j<8; j++) {

      if ((i===0) && (j===0)) 
        cy.get("td").eq(j).should("exist");
        else if ( (i===1) && (j===1) ) 
          cy.get("td").eq(j).should("have.text", newContact.firstName +" " + newContact.lastName)
          else if ( (i===2) && (j===2) ) 
            cy.get("td").eq(j).should("have.text", newContact.birthday)
            else  if ( (i===3) && (j===3) ) 
              cy.get("td").eq(j).should("have.text", newContact.email)
              else  if ( (i===4) && (j===4) ) 
                cy.get("td").eq(j).should("have.text", newContact.phone)
                else  if ( (i===5) && (j===5) ) 
                  cy.get("td").eq(j).should("contain", newContact.address)
                  else  if ( (i===6) && (j===6) ) 
                    cy.get("td").eq(j).should("have.text", newContact.city +" "+ newContact.province + " " + newContact.postal_code)
                    else if  ( (i===7) && (j===7) ) 
                    cy.get("td").eq(j).should("have.text", newContact.country)
        }
       }

  })
    
    
  

    

   
  });

});

/*
describe("USE CASE 3 Contact details page", () => {
  it("passes", () => {
  });
});


*/
