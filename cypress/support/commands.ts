// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// my code
import './e2e';
import { environment } from '../../src/environments/environment';

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add('getBySelLike', (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args);
});

Cypress.Commands.add('loginTestUser', () => {
  const username = environment.AUTH0_USERNAME;
  const password = environment.AUTH0_PASSWORD;

  const usernameInput = cy.get('.auth0-lock-input-email');
  if (usernameInput) {
    cy.get('.auth0-lock-input-email').type(username);
    cy.get('.auth0-lock-input-show-password').type(password);
    cy.get('.auth0-lock-submit').click();
    cy.wait(1000);
    cy.url().should('include', ['/employees']);
  }
});

Cypress.Commands.add('logOutTestUser', () => {
  const menu = cy.get(
    '.mat-toolbar > .mat-focus-indicator > .mat-button-wrapper > .mat-icon'
  );
  cy.get('.mat-drawer-inner-container');
  menu.click({ force: true });
  cy.wait(1000);

  const signOut = cy.get(':nth-child(3) > .mat-list-item-content');

  signOut.click({ force: true });
  cy.wait(1000);
  cy.url().should('include', ['https://owezzy.auth0.com/login']);
});
