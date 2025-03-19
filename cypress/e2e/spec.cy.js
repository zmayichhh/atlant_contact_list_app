describe("This is a suite for tests regarding Login", () => {
  it(
    "Precondition: set Login as required for Tectronica",
    { retries: 0 },
    () => {
      cy.once("uncaught:exception", () => false);
      cy.visit(
        "https://console-stage.event-cloud.com/branding/EVENTGUIDE/edit"
      );
      cy.viewport("macbook-16");
      cy.get("#floatingUsername").type("ASmajic");
      cy.get("#floatingPassword").type("19smajic9615");
      cy.get(".btn-primary").click();
      cy.get(".react-autosuggest__input")
        .type("tectronica")
        .get("#react-autowhatever-1-section-0-item-0")
        .wait(1000)
        .should("be.visible")
        .click();
      cy.wait(3000);
      cy.get('input[placeholder="Filter configuration ..."]').type(
        "Require Login"
      );
      cy.contains("Login Configuration").click();
      cy.wait(3000);
      cy.get('input[type="checkbox"]').check();
      cy.wait(4000);
      cy.contains("Save").click();
      cy.wait(4000);
    }
  );

  it(
    "GUIDE-T823 Verify user can't login with invalid inputs",
    { retries: 0 },
    function () {
      cy.origin("https://tectronica-stage.event-cloud.com/", () => {
        cy.visit("/");
        cy.viewport("macbook-16");

        //Click the Enter button
        cy.get("#loginSubmit").should("be.disabled").click({ force: true });
        cy.wait(1000);

        //Enter an invalid email address in the input field or leave the field empty
        cy.get("#egFocusTextInput").type("test@.test");
        cy.wait(1000);
        cy.get("#loginSubmit").should("be.disabled").click({ force: true });
        cy.get("#egFocusTextInput").clear().type("@test.test");
        cy.wait(1000);
        cy.get("#loginSubmit").should("be.disabled").click({ force: true });
        cy.get("#egFocusTextInput").clear().type("email.domain.com");
        cy.wait(1000);
        cy.get("#loginSubmit").should("be.disabled").click({ force: true });

        //Check both checkmarks
        cy.get("#privacyCheckbox").should("not.be.checked").click();
        cy.get("#privacySecondCheckbox").should("not.be.checked").click();
        cy.wait(1000);
        cy.get("#loginSubmit").should("be.disabled").click({ force: true });
        cy.wait(1000);

        //Uncheck first checkmark
        cy.get("#privacyCheckbox").should("be.checked").click();
        cy.get("#loginSubmit").should("be.disabled").click({ force: true });

        //Uncheck the second checkmark but check the first checkmark
        cy.get("#privacyCheckbox").should("not.be.checked").click();
        cy.get("#privacySecondCheckbox").should("be.checked").click();
        cy.get("#loginSubmit").should("be.disabled").click({ force: true });

        //Uset is still in the Login page
        cy.get(".sc-iDrsvL p")
          .first()
          .should(
            "have.text",
            "Please log in with the same email address you used to register in the ticket shop."
          );
      });
    }
  );

  it(
    "GUIDE-T1054 Verify user can register a new profile",
    { retries: 0 },
    function () {
      const emailAddress = `testerQAA@v9ambiev.mailosaur.net`;

      cy.visit("https://tectronica-stage.event-cloud.com/");
      cy.viewport("macbook-16");
      cy.get("#egFocusTextInput").type(emailAddress);
      cy.get("#privacyCheckbox").click();
      cy.get("#privacySecondCheckbox").click();
      cy.get("#loginSubmit").click();

      cy.mailosaurGetMessage(
        Cypress.env("MAILOSAUR_SERVER_ID"),
        {
          sentTo: emailAddress,
        },
        { timeout: 30000 }
      ).then((email) => {
        console.log("Full email object:", email);
        console.log("Extracted email text body:", email.text.body);

        const emailBody = email.html.body;
        const match = emailBody.match(/(\d{6})/);

        if (!match) throw new Error("No 6-digit token found in the email.");

        const token = match[1]; // Extract the first match
        cy.wrap(token).as("previousPasscode");

        cy.wait(4000);
        cy.get(".cnatuI").type(token);
        cy.get("#loginSubmit").click();
      });
    }
  );

  it(
    "GUIDE-T316 Verify user can't use a previous passcode for login",
    { retries: 0 },
    function () {
      cy.visit("https://tectronica-stage.event-cloud.com/");
      cy.viewport("macbook-16");
      cy.get("#egFocusTextInput").type("tesst@corussoft.de");
      cy.get("#privacyCheckbox").click();
      cy.get("#privacySecondCheckbox").click();
      cy.get("#loginSubmit").click({ force: true });

      cy.get(".cnatuI").type("@previousPasscode");
      cy.get("#loginSubmit").click();
      cy.get(".sc-gIXnQW p").should(
        "have.text",
        "The provided confirmation code is incorrect."
      );
      cy.get("#loginSubmit").should("be.disabled");
    }
  );

  it(
    "GUIDE-T768 Verify user can succesfully login his account",
    { retries: 0 },
    function () {
      cy.visit("https://tectronica-stage.event-cloud.com/");
      cy.viewport("macbook-16");
      cy.get("#egFocusTextInput").type("admin.ulo3m8wf.tester@corussoft.de");
      cy.get("#privacyCheckbox").click();
      cy.get("#privacySecondCheckbox").click();
      cy.get("#loginSubmit").click();

      cy.get(".cnatuI").type("102030");
      cy.get("#loginSubmit").click();
      cy.wait(2000);
      cy.get(".sc-cMTCJW").should("be.visible");
      cy.contains("");
    }
  );

  it(
    "GUIDE-T776 Verify user can change the email address on the login page",
    { retries: 0 },
    function () {
      cy.visit("https://tectronica-stage.event-cloud.com/");
      cy.viewport("macbook-16");
      cy.get("#egFocusTextInput").type("admin.ulo3m8wf.tester@corussoft.de");
      cy.get("#privacyCheckbox").click();
      cy.get("#privacySecondCheckbox").click();
      cy.get("#loginSubmit").click();
      cy.get("Change email address").click();
      cy.get('input[placeholder="Please enter your email address"]').should(
        "exist"
      );
    }
  );

  it("After: set Login as not required for Tectronica", { retries: 0 }, () => {
    cy.once("uncaught:exception", () => false);
    cy.visit("https://console-stage.event-cloud.com/branding/EVENTGUIDE/edit");
    cy.viewport("macbook-16");
    cy.get("#floatingUsername").type("ASmajic");
    cy.get("#floatingPassword").type("19smajic9615");
    cy.get(".btn-primary").click();
    cy.wait(3000);
    cy.get(".svg-inline--fa.fa-xmark ").eq(2).click();
    cy.get(".svg-inline--fa.fa-xmark ").eq(2).click();
    cy.get(".react-autosuggest__input")
      .type("tectronica")
      .get("#react-autowhatever-1-section-0-item-0")
      .wait(4000)
      .should("be.visible")
      .wait(4000)
      .click();
    cy.wait(3000);
    cy.get('input[placeholder="Filter configuration ..."]').type(
      "Require Login"
    );
    cy.contains("Login Configuration").click();
    cy.wait(3000);
    cy.get('input[type="checkbox"]').click();
    cy.wait(4000);
    cy.contains("Save").click();
    cy.wait(4000);
  });

  it(
    "GUIDE-T1222 Verify Login restrictions are present for anonymous user",
    { retries: 0 },
    function () {
      cy.visit("https://tectronica-stage.event-cloud.com/");
      cy.viewport("macbook-16");

      //Checks for Login baner on top
      cy.get(".sc-bXYFGE").should(
        "have.text",
        "Log in or register your account now to unlock an enhanced user experience with exclusive features"
      );
      cy.get(".sc-fpQDOt button").click();
      cy.get("#loginForm p").should(
        "have.text",
        "Please log in with the same email address you used to register in the ticket shop."
      );
      cy.get(".sc-eENQfJ").click();
      cy.wait(1000);

      //Check for restrictions in the CC
      cy.get(".sc-jOcvlT")
        .find(".sc-igrHqy")
        .each(($el, $index) => {
          cy.wrap($el).click();
          if ($index === 0)
            cy.get(".sc-bnRfdH").should(
              "have.text",
              "Login to see all participants. Search and connect with others."
            );
          else if ($index === 1)
            cy.get(".sc-bnRfdH").should(
              "have.text",
              "Chat with all participants. Start individual conversations, group chats etc."
            );
          else if ($index === 2)
            cy.get(".sc-bnRfdH").should(
              "have.text",
              "Check the availability of other users and schedule meetings with them."
            );
          else
            cy.get(".sc-bnRfdH").should(
              "have.text",
              "Stay informed about all activities and news at the event."
            );

          cy.get(".sc-jOcvlT").find(".sc-jvBRMK").click();
          cy.get("#loginForm p").should(
            "have.text",
            "Please log in with the same email address you used to register in the ticket shop."
          );
          cy.get(".sc-eENQfJ").click();
          cy.wait(1000);
        });

      //Check for Guest icon in CC
      cy.get(".sc-hbxnAh").click();
      cy.get(".sc-bRBSdq .sc-fnTTeQ").first().should("have.text", "Guest");

      //Check if sections on Lobby page are hidden behind Log in
      cy.get(".sc-lfmjfu")
        .should("have.length", 14)
        .each(($el, index, $list) => {
          cy.wrap($el).then(($element) => {
            const tekst = $element.text();
            const anonSections = [
              "Live Sessions",
              "Participants",
              "Virtual Café",
              "Collections",
              "Business",
            ];
            function findElement() {
              for (let i = 0; i < 5; i++) {
                if (tekst === anonSections[i]) {
                  cy.get(".sc-cDdODC")
                    .eq(index)
                    .find(".sc-eAFZUK")
                    .should(
                      "have.text",
                      "To unlock the feature you need to login"
                    );
                  cy.get(".sc-cDdODC").eq(index).find("button").click();
                  cy.wait(2000);
                  cy.get("#loginForm p").should(
                    "have.text",
                    "Please log in with the same email address you used to register in the ticket shop."
                  );
                  cy.get(".sc-eENQfJ").click();
                  cy.wait(1000);
                }
              }
            }
            findElement();
          });
        });

      //Check for restrictions in the navigation menu
      cy.get(".list-group")
        .find(".sc-gnQwKE")
        .should("have.length", 4)
        .each(($el, $index) => {
          cy.wrap($el).find(".sc-iikBpt").trigger("mouseover", { force: true });
          cy.wait(2000);
          cy.wrap($el)
            .find("svg")
            .invoke("attr", "data-src")
            .should("eq", "/applicationMedia/icons/anonymous_user_icon.svg");
          cy.wrap($el).click();
          cy.get("#loginForm p").should(
            "have.text",
            "Please log in with the same email address you used to register in the ticket shop."
          );
          cy.get(".sc-eENQfJ").click();
          cy.wait(1000);
        });

      //Check for direct link restrictions
      cy.visit("https://tectronica-stage.event-cloud.com/meetings");
      cy.wait(2000);
      cy.get("#loginForm p").should(
        "have.text",
        "Please log in with the same email address you used to register in the ticket shop."
      );
      cy.get(".sc-eENQfJ").click();

      cy.visit("https://tectronica-stage.event-cloud.com/meetings/tectronica1");
      cy.wait(2000);
      cy.get("#loginForm p").should(
        "have.text",
        "Please log in with the same email address you used to register in the ticket shop."
      );
      cy.get(".sc-eENQfJ").click();

      cy.visit("https://tectronica-stage.event-cloud.com/customcollections");
      cy.wait(2000);
      cy.get("#loginForm p").should(
        "have.text",
        "Please log in with the same email address you used to register in the ticket shop."
      );
      cy.get(".sc-eENQfJ").click();

      cy.visit(
        "https://tectronica-stage.event-cloud.com/meeting/ce_af970dd4-869d-4358-9272-862e217dbdc4"
      );
      cy.wait(2000);
      cy.get("#loginForm p").should(
        "have.text",
        "Please log in with the same email address you used to register in the ticket shop."
      );
      cy.get(".sc-eENQfJ").click();

      cy.visit(
        "https://tectronica-stage.event-cloud.com/company/QA-1337-GmbH--exhibitor5049/backoffice"
      );
      cy.wait(2000);
      cy.get("#loginForm p").should(
        "have.text",
        "Please log in with the same email address you used to register in the ticket shop."
      );
      cy.get(".sc-eENQfJ").click();

      cy.visit(
        "https://tectronica-stage.event-cloud.com/person/Amar-Alikadic--u-CWmLAWcXNWeNlwe3xv2NHiqHwr7YegRM0rNixmq8RHUm5YTGDqsBjtrHwWn2gVhU"
      );
      cy.wait(2000);
      cy.get("#loginForm p").should(
        "have.text",
        "Please log in with the same email address you used to register in the ticket shop."
      );
      cy.get(".sc-eENQfJ").click();

      cy.visit("https://tectronica-stage.event-cloud.com/myprofile");
      cy.wait(2000);
      cy.get("#loginForm p").should(
        "have.text",
        "Please log in with the same email address you used to register in the ticket shop."
      );
      cy.get(".sc-eENQfJ").click();

      //Check for restrictions on the share icon
      cy.get(".sc-jhAPSg .lobby-layout").find(".sc-bxosTz").first().click();
      cy.wait(2000);
      cy.get("#loginForm p").should(
        "have.text",
        "Please log in with the same email address you used to register in the ticket shop."
      );
      cy.get(".sc-eENQfJ").click();
    }
  );
});
