import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserProfileActions } from '../actions';
import { map } from 'rxjs/operators';

@Injectable()
export class UserProfilePageEffects {
  updateAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfileActions.userProfileAddress),
      // we could  use high order function to interact wih api then map response
      map((address) =>
        UserProfileActions.userProfileAddressUpdateSuccess({ address })
      )
    )
  );

  constructor(private actions$: Actions) {}
}
