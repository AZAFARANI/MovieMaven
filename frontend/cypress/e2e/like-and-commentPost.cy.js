describe("test for liking and commenting post", () => {
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

  it("should like and unlike post", () => {
    cy.get("#mostRecentBtn").click();
    cy.get("#singlePost").click();

    cy.get("#likePostIcon").click();
    cy.get("#postLikeValue").contains("1 likes");

    cy.get("#UnlikePostIcon").click();
    cy.get("#postLikeValue").contains("0 likes");
  });

  it("should comment post", () => {
    cy.get("#mostRecentBtn").click();
    cy.get("#singlePost").click();

    cy.get("#reviewPostCommentBtn").click();
    cy.get("#reviewCommentInput").type("comment here...");
    cy.get("#reviewPublishComment").click();
    cy.get("#reviewCommentValue").contains("comment here...");
  });

  it("should delete post", () => {
    cy.get("#mostRecentBtn").click();
    cy.get("#singlePost").click();

    cy.get("#deletePostIcon").click();
    cy.get("#deleteBtn").click();
  });
});
