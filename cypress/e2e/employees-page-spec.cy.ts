describe('Employees Page Test Suite', () => {
  before('Login TestUser and Navigate to Employees Page', () => {
    cy.visit('/');
    cy.wait(1000);
    const username = Cypress.env('auth0_username');

    const log = Cypress.log({
      displayName: 'AUTH0 LOGIN',
      message: [`🔐 Authenticating | ${username}`],
      // @ts-ignore
      autoEnd: false,
    });

    log.snapshot('before');
    cy.loginTestUser();
    cy.wait(1000);
  });

  it('should display Employees Page', function () {
    cy.wait(1000);
    cy.get('.azarc-list-name').within(() => cy.contains('Employees'));
  });

  it('should create new Test Employee', function () {
    cy.getBySel('data-table-create-button').click();

    const createUpdateForm = cy.getBySel('employee-create-update-form');
    createUpdateForm.should('be.visible');

    cy.fixture('sample-employee').then((data) => {
      createUpdateForm.within(() => {
        cy.get('#mat-input-0').clear().type(data.firstName);
        cy.get('#mat-input-1').clear().type(data.lastName);
        cy.get('#mat-input-2').clear().type(data.street);
        cy.get('#mat-input-3').clear().type(data.zipcode);
        cy.get('#mat-input-4').clear().type(data.city);
        cy.get('#mat-input-5').clear().type(data.phoneNumber);
        cy.get('.mat-dialog-actions > .mat-focus-indicator')
          .should('be.visible', 'CREATE EMPLOYEE')
          .click();
      });

      cy.wait(1000);
      const searchbar = cy.get('.azarc-filter-input');

      searchbar.clear().type(data.firstName);

      const result = cy.get('tbody > :nth-child(1) > .cdk-column-firstName');

      result.should('include.text', data.firstName);
      searchbar.clear();
    });
  });

  it('should Update Test Employee', () => {
    cy.fixture('sample-employee').then((data) => {
      const searchbar = cy.get('.azarc-filter-input');

      searchbar.clear().type(data.firstName);
      cy.wait(1000);

      const result = cy.get('tbody > :nth-child(1) > .cdk-column-firstName');
      result.should('be.visible');

      const actionsIcon = cy.get(
        '.actions-cell > .mat-focus-indicator > .mat-button-wrapper > .mat-icon'
      );
      actionsIcon.click();
      const modifyButton = cy.get('.mat-menu-content > :nth-child(1)');
      modifyButton.click();
      const createUpdateForm = cy.getBySel('employee-create-update-form');
      createUpdateForm.should('be.visible');

      createUpdateForm.within(() => {
        cy.get('#mat-input-6').clear().type(data.newFirstName);
        cy.get('.mat-dialog-actions > .mat-focus-indicator')
          .should('be.visible', 'UPDATE EMPLOYEE')
          .click();
      });

      searchbar.clear().type(data.newFirstName);
      cy.wait(1000);

      const newResult = cy.get('tbody > :nth-child(1) > .cdk-column-firstName');
      newResult.should('include.text', data.newFirstName);
      searchbar.clear();
    });
  });

  it('should Delete Test Employee', () => {
    cy.fixture('sample-employee').then((data) => {
      const searchbar = cy.get('.azarc-filter-input');

      searchbar.clear().type(data.newFirstName);
      cy.wait(1000);

      const deleteResult = cy.get(
        'tbody > :nth-child(1) > .cdk-column-firstName'
      );
      deleteResult.should('be.visible');

      const deleteActionsIcon = cy.get(
        '.actions-cell > .mat-focus-indicator > .mat-button-wrapper > .mat-icon'
      );
      deleteActionsIcon.click();
      const deleteButton = cy.get('.mat-menu-content > :nth-child(2)');
      deleteButton.click();

      cy.wait(1000);

      searchbar.clear();
    });
  });

  after('Logout Test User', () => {
    const username = Cypress.env('auth0_username');
    const log = Cypress.log({
      displayName: 'AUTH0 LOGOUT',
      message: [`🔐 Authenticating | ${username}`],
      // @ts-ignore
      autoEnd: false,
    });

    cy.logOutTestUser();
    log.snapshot('after');
    log.end();
  });
});
