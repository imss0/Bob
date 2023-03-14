import type {} from "cypress";

describe("Render table test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/shifts");
  });

  it("finds the table head starting from '1'", () => {
    cy.contains("1");
  });

  it("finds the table head end with '28'", () => {
    cy.contains("28");
  });
})