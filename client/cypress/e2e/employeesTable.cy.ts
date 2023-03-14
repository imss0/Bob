import type {} from "cypress";

describe("My First Test", () => {
  it("Creates a new employee", () => {
    // @TODO - Is there a way to visit the page once and then run all the tests based off of the initial page visit?
    cy.visit("http://localhost:3000/employees");
    cy.get('[data-cy="name-input"]').type("John");
    cy.get('[data-cy="surname-input"]').type("Smith");
    cy.get('[data-cy="email-input"]').type("john@smith.com");
    cy.get('[data-cy="create-employee"]').click();
  });
  it("Deletes an employee", () => {
    cy.visit("http://localhost:3000/employees");
    cy.get('[data-cy="delete-employee"]').first().click();
  });
  it("Able to click on Shift Types", () => {
    cy.visit("http://localhost:3000/employees");
    cy.contains("Shift Types").click();
    cy.url().should("include", "/shift-types");
  });
  // it("Creates a new shift", () => {
  //   cy.visit("http://localhost:3000/shift-types");
  // });
});

// Cypress._.times(5, () => {
//   it("Creates a new employee", () => {
//     cy.visit("http://localhost:3000/employees");
//     cy.get('[data-cy="name-input"]').type("John");
//     cy.get('[data-cy="surname-input"]').type("Smith");
//     cy.get('[data-cy="email-input"]').type("example@example.com");
//   });
// });
