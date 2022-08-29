/// <reference types="cypress" />

describe("mobile scroll test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.viewport(360, 760);
  });

  it("should not have a horizontal scroll on a mobile device", () => {
    cy.get("[test-id='mui-root']").invoke("width").should("not.be.greaterThan", 360);
  });
});
