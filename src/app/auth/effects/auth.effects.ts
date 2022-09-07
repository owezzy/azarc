import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, exhaustMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as AuthActions from '../actions/auth.actions';
import { AuthApiActions, LoginPageActions } from '../actions';
import { MatDialog } from '@angular/material/dialog';
import { LogoutConfirmationDialogComponent } from '../components/logout-confirmation-dialog.component';
import { AuthStateService } from '../services';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';

@Injectable()
export class AuthEffects {
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

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.checkLoginStatus),
      concatMap(() => {
        return this.authService
          .getUserProfile()
          .pipe(map((user) => AuthApiActions.loginUserProfile({ user })));
      })
    )
  );

  ngrxOnInitEffects(): Action {
    return AuthApiActions.checkLoginStatus();
  }
  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.loginRedirect, AuthActions.logout),
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
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

  // logoutIdleUser$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UserActions.idleTimeout),
  //     map(() => AuthActions.logout())
  //   )
  // );

  constructor(
    private actions$: Actions,
    private authService: AuthStateService,
    private router: Router,
    private dialog: MatDialog
  ) {}
}
