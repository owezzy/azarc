import { Inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    private auth0: AuthService
  ) {}
  login(): Observable<any> {
    return this.auth0.loginWithRedirect({
      returnTo: environment.appUri + '/employees',
    });
  }

  logout() {
    return this.auth0.logout();
  }

  getUserProfile() {
    return this.auth0.user$;
  }

  getUserToken() {
    return this.auth0.idTokenClaims$;
  }

  isUserAuthenticated() {
    return this.auth0.isAuthenticated$;
  }

  isAuth0Loading() {
    return this.auth0.isLoading$;
  }

  Auth0Errors() {
    return this.auth0.error$;
  }
}
