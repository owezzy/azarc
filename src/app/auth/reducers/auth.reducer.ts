import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { AuthApiActions } from '../actions';

export const statusFeatureKey = 'status';

export interface State {
  user: any | null;
}

export const initialState: State = {
  user: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthApiActions.loginUserProfile, (state, { user }) => ({
    ...state.user,
    user,
  })),
  on(AuthActions.logout, () => initialState)
  // on(AuthActions.loadAuths, state => state),
  // on(AuthActions.loadAuthsSuccess, (state, action) => state),
  // on(AuthActions.loadAuthsFailure, (state, action) => state),
);

export const getUser = (state: State) => state.user;
