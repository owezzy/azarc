import { props, createAction } from '@ngrx/store';

export const loginSuccess = createAction('[Auth0/API] Login Success');
export const checkLoginStatus = createAction('[Auth0/API] Check Login Status');

export const loginUserProfile = createAction(
  '[Auth0/API] Login User Profile',
  props<{ user: any }>()
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: any }>()
);

export const loginRedirect = createAction('[Auth/API] Login Redirect');
