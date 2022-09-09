import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../reducers';
import { LoginPageActions } from '../../actions';

@Component({
  selector: 'app-login-page',
  template: ` <app-login-form
    (initializeLogin)="InitLogin($event)"
    [pending]="(pending$ | async)!"
    [errorMessage]="(error$ | async)!"
  >
  </app-login-form>`,
  styles: [],
})
export class LoginPageComponent {
  pending$ = this.store.select(fromAuth.selectLoginPagePending);
  error$ = this.store.select(fromAuth.selectLoginPageError);

  constructor(private store: Store) {}

  onSubmit(credentials: any) {
    this.store.dispatch(LoginPageActions.login());
  }

  InitLogin(event) {
    this.store.dispatch(LoginPageActions.login());
  }
}
