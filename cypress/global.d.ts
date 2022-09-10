declare namespace Cypress {
  interface CustomWindow extends Window {}

  interface Chainable {
    /**
     *  Window object with additional properties used during test.
     */
    window(options?: Partial<Loggable & Timeoutable>): Chainable<CustomWindow>;

    /**
     * Custom command to make taking Percy snapshots with full name formed from the test title + suffix easier
     */
    visualSnapshot(maybeName?): Chainable<any>;

    getBySel(
      dataTestAttribute: string,
      args?: any
    ): Chainable<JQuery<HTMLElement>>;

    getBySelLike(
      dataTestPrefixAttribute: string,
      args?: any
    ): Chainable<JQuery<HTMLElement>>;

    /**
     * Logs in via Auth0 API
     */
    loginByAuth0Api(username: string, password: string): Chainable<any>;
    loginTestUser(): Chainable<any>;
    logOutTestUser(): Chainable<any>;
  }
}
