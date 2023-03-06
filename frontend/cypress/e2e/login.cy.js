describe("login page tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should get login container with corresponding inputs and login user", () => {
    cy.get("#logincnt");

    //replace username and password with your login credentials!
    cy.get("#loginUserName").type("newUser");
    cy.get("#passwordInput").type("hello123");
    cy.get("#loginUserBtn").click();
  });

  it("should get login and register container with corresponding inputs and register user", () => {
    cy.get("#logincnt");

    cy.get("#registerAccount").click();
    cy.get("#registerEmailInput").type("newEmail@gmail.com");
    cy.get("#registerUsernameInput").type("newUsername");
    cy.get("#passwordInput").type("password");
    cy.get("#registerConfirmInput").type("password");
    cy.get("#registerUserBtn").click();
  });
});
