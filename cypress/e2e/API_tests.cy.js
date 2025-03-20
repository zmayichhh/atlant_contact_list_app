///<reference types="cypress" />

describe ("API tests", () => {

    const randomName = Math.random().toString().substring(2,7);
    const randomLastname = Math.random().toString().substring(2,7);
    const randomEmail = Math.random().toString().substring(2,7) + "@test.com";
    const randomPassword = Math.random().toString().substring(2,10);
 
    const userCredentials = {
        firstName: randomName,
        lastName: randomLastname,
        email: randomEmail,
        password: randomPassword
  }
 
  let userId;
 
 
    before("Verify a new user can be created", () => {
 
    cy.request({
        method: "POST",
        url: "https://thinking-tester-contact-list.herokuapp.com/users",
        body: { "firstName": userCredentials.firstName,
                "lastName": userCredentials.lastName,
                "email": userCredentials.email,
                "password": userCredentials.password
              }
        }).then( ($response) => {
   
        expect($response.status).to.be.oneOf([200, 201]);
        expect($response.body).to.have.property("token")
        expect($response.body.user.firstName).to.eq(userCredentials.firstName)
        expect($response.body.user.lastName).to.eq(userCredentials.lastName)
        expect($response.body.user.email).to.eq(userCredentials.email)

        Cypress.env("userToken", $response.body.token);

        //userToken = $response.body.token
        userId = $response.body.user._id

        })
    })
    
 
    it("Verify an existing user can log in", () => {

    cy.request({
        method: "POST",
        url: "https://thinking-tester-contact-list.herokuapp.com/users/login",
        body: { "email": "smajic.adi@hotmail.com",
                "password": "1234567"
              }
        }).then( ($response) => {
            expect($response.status).to.eq(200);
            expect($response.body).to.have.property("token")
            expect($response.body.user.firstName).to.eq("Adi")
            expect($response.body.user.lastName).to.eq("Smajić")
            expect($response.body.user.email).to.eq("smajic.adi@hotmail.com")
        })
 
    })
 
    it("Verify geting existing user profile", () => {

        const userToken = Cypress.env("userToken");

        cy.request({
            method: "GET",
            url: "https://thinking-tester-contact-list.herokuapp.com/users/me",
            headers: { Authorization: `Bearer ${userToken}`}
            }).then( ($response) => {
   
            expect($response.status).to.eq(200);
            expect($response.body.firstName).to.eq(userCredentials.firstName)
            expect($response.body.lastName).to.eq(userCredentials.lastName)
            expect($response.body.email).to.eq(userCredentials.email)
            expect($response.body._id).to.eq(userId)
            })
   
    })
    
    /*
    //it("Verify Updating existing user profile", () => {
 
        const userToken = Cypress.env("userToken");
        cy.request({
            method: "PATCH",
            url: "https://thinking-tester-contact-list.herokuapp.com/users/me",
            headers: { Authorization: `Bearer ${userToken}`},
            body: {
                "firstName": userCredentials.firstName + "_update",
                "lastName": userCredentials.lastName + "_update",
                "email": userCredentials.email + "_update",
                "password": userCredentials.password + "_update"
            }
            }).then( ($response) => {
 
            expect($response.status).to.eq(200);
            expect($response.body._id).to.eq(userId)
            expect($response.body.firstName).to.eq(userCredentials.firstName + "_update")
            expect($response.body.lastName).to.eq(userCredentials.lastName + "_update")
            expect($response.body.email).to.eq(userCredentials.email + "_update")

            })
   
    })
    */
   
    it("Verify an existing user can log out", () => {
 
        const userToken = Cypress.env("userToken");
        cy.request({
            method: "POST",
            url: "https://thinking-tester-contact-list.herokuapp.com/users/logout",
            headers: { Authorization: `Bearer ${userToken}`}
            }).then( ($response) => {
                expect($response.status).to.eq(200)
            })

    })
    
    it("Verify an existing user is deleted", () => {

        const userToken = Cypress.env("userToken");

        cy.request({
            method: "DELETE",
            url: "https://thinking-tester-contact-list.herokuapp.com/users/me",
            headers: { Authorization: `Bearer ${userToken}`}
            }).then( ($response) => {
                expect($response.status).to.eq(200)
            })

        cy.visit("/");
        cy.contains("Contact List App");
        cy.get("#email").type(randomEmail)
        cy.get("#password").type(randomPassword)
        cy.contains("Submit").click()
        cy.get("#error").should("exist").and("have.text", "Incorrect username or password")

    })
 
 
 })
 
 