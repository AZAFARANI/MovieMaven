describe("test for crud operations on post.", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    //replace username and password with your login credentials!
    cy.get("#loginUserName").type("newUser");
    cy.get("#passwordInput").type("hello123");
    cy.get("#loginUserBtn").click();
  });

  it("should create post", () => {
    cy.get("#postsCreateBtn").click();
    cy.get("#selectMovieInput").type("gladiator");
    cy.get("#selectMovieBtn").click();

    cy.get("#singlePost").click();
    cy.get("#createPostContent").type("review here...");
    cy.get("#publishBtn").click();
  });

  it("should edit and delete post", () => {
    cy.get("#mostRecentBtn").click();
    cy.get("#singlePost").click();
    cy.get("#editPostIcon").click();
    cy.get("#editPostInput").clear().type("edited post!");
    cy.get("#submitEditBtn").click();
    cy.get("#reviewContentSpan").contains("edited post!");

    cy.get("#deletePostIcon").click();
    cy.get("#deleteBtn").click();
  });
});
