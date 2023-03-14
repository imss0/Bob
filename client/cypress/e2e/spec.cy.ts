import type {} from "cypress";

describe("My First Test", () => {
  it("Visits employees table", () => {
    cy.visit("http://localhost:3000/employees");
    cy.contains("type");
  });
});
