describe("tests for navbar", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    //replace username value with your username
    cy.get("#loginUserName").type("newUser");

    //replace password value with your password
    cy.get("#passwordInput").type("hello123");
    cy.get("#loginUserBtn").click();
  });

  it("should test all links in extended navbar", () => {
    cy.get("#layoutNav");
    cy.get("#extendedLinkReviews").click().visit("http://localhost:3000/");
    cy.get("#extendedLinkCreate")
      .click()
      .visit("http://localhost:3000/selectMovie");
    cy.go("back");

    //replace "newUser" parameter in url with the username you logged in with!
    cy.get("#extendedLinkProfile")
      .click()
      .visit("http://localhost:3000/user/newUser");

    cy.go("back");
    cy.get("#logOutBtn").click().visit("http://localhost:3000");
  });

  it("should test all navbar links in mobile version", () => {
    cy.viewport(500, 1000);
    cy.get("#navHamburger").click();
    cy.get("#MobileNavLinkReviews").click().visit("http://localhost:3000/");

    cy.get("#navHamburger").click();
    cy.get("#MobileNavLinkCreate")
      .click()
      .visit("http://localhost:3000/selectMovie");

    cy.go("back");
    cy.get("#navHamburger").click();

    //replace "newUser" parameter in url with the username you logged in with!
    cy.get("#MobileNavLinkProfile")
      .click()
      .visit("http://localhost:3000/user/newUser");

    cy.go("back");
    cy.get("#navHamburger").click();
    cy.get("#MobileNavSignOut").click().visit("http://localhost:3000");
  });
});
