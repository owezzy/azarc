import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from '../actions/auth.actions';
import { AuthApiActions, LoginPageActions } from '../actions';
import { MatDialog } from '@angular/material/dialog';
import { LogoutConfirmationDialogComponent } from '../components/logout-confirmation-dialog.component';
import { AuthStateService } from '../services';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  ngrxOnInitEffects(): Action {
    return AuthApiActions.checkLoginStatus();
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginPageActions.login),
      exhaustMap(() =>
        this.authService.login().pipe(
          map(() => AuthApiActions.loginSuccess()),
          catchError((error) => of(AuthApiActions.loginFailure({ error })))
        )
      )
    )
  );

  checkLoginStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.checkLoginStatus),
      concatMap(() => {
        return this.authService
          .getUserProfile()
          .pipe(map((user) => AuthApiActions.loginUserProfile({ user })));
      })
    )
  );

  logoutConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutConfirmation),
      exhaustMap(() => {
        const dialogRef = this.dialog.open<
          LogoutConfirmationDialogComponent,
          undefined,
          boolean
        >(LogoutConfirmationDialogComponent);

        return dialogRef.afterClosed();
      }),
      map((result) =>
        result ? AuthActions.logout() : AuthActions.logoutConfirmationDismiss()
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthStateService,
    private router: Router,
    private dialog: MatDialog
  ) {}
}
