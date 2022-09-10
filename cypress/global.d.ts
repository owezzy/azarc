declare namespace Cypress {
  interface Chainable {
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
