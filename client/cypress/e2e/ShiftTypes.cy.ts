import type {} from "cypress";

describe("Render table test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/shift-types");
  });

  it("finds the table head 'Type'", () => {
    cy.contains("Type");
  });

  it("finds the table head 'Abbreviation'", () => {
    cy.contains("Abbreviation");
  });

  it("finds the table head 'Start'", () => {
    cy.contains("Start");
  });

  it("finds the table head 'End'", () => {
    cy.contains("End");
  });
})

