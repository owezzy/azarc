describe('Profile Page Test Suite', () => {
  before('Login TestUser and Navigate to Profile Page', () => {
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
  it('should load Profile Page', function () {
    // cy.visit('/profile');
    const menu = cy.get(
      '.mat-toolbar > .mat-focus-indicator > .mat-button-wrapper > .mat-icon'
    );
    cy.get('.mat-drawer-inner-container');
    menu.click();
    cy.wait(1000);

    const profilePage = cy.get(':nth-child(1) > .mat-list-item-content');
    cy.wait(1000);

    profilePage.click({ force: true });

    cy.url().should('include', ['/profile']);
    cy.contains('My Profile');
  });

  it('should update User Address', function () {
    const address = cy.get('form');
    cy.fixture('test-user-address').then((data) => {
      address
        .get('#formly_6_input_recipientName_0')
        .clear()
        .type(data.recipientName);
      address
        .get('#formly_6_input_buildingName_1')
        .clear()
        .type(data.buildingName);
      address.get('#formly_6_input_streetName_2').clear().type(data.streetName);
      address.get('#formly_6_input_postTown_3').clear().type(data.postTown);
      address.get('#formly_6_input_postCode_5').clear().type(data.postCode);
      address.get('#mat-select-value-3').click({ force: true });
      cy.get('#mat-option-1 > .mat-option-text').click();
      cy.getBySel('address-button').click();
      cy.wait(1000);
    });
  });

  it('should display updated address', function () {
    cy.fixture('test-user-address').then((data) => {
      cy.contains('address', data.recipientName);
      cy.contains('address', data.buildingName);
      cy.contains('address', data.streetName);
      cy.contains('address', data.postCode);
      cy.contains('address', data.postTown);
      cy.contains('address', data.officeLocation);
    });
  });

  after(() => {
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
