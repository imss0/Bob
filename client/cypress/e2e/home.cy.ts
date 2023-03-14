import type {} from "cypress";

describe("Render nav test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("finds the content 'home'", () => {
    cy.contains("Home");
  });

  it("finds the content 'employees'", () => {
    cy.contains("Employees");
  });

  it("finds the content 'Shift Types'", () => {
    cy.contains("Shift Types");
  });

  it("finds the content 'Shifts'", () => {
    cy.contains("Shifts");
  });

  it("finds the content 'Rota'", () => {
    cy.contains("Rota");
  });
});


describe("Nav link test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("clicking 'Employees' navigates to a new url", () => {
    cy.contains("Employees").click();
    cy.url().should('include', '/employees')
  });

  it("clicking 'Shift Types' navigates to a new url", () => {
    cy.contains("Shift Types").click();
    cy.url().should('include', '/shift-types')
  });

  it("clicking 'Shifts' navigates to a new url", () => {
    cy.contains("Shifts").click();
    cy.url().should('include', '/shifts')
  });

  it("clicking 'Rota' navigates to a new url", () => {
    cy.contains("Rota").click();
    cy.url().should('include', '/rota')
  });


});
