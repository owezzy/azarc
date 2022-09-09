import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { AuthApiActions, UserProfileActions } from '../actions';

export const statusFeatureKey = 'status';

export interface State {
  user: any | null;
  address: any | null;
}

export const initialState: State = {
  user: null,
  address: {
    recipientName: 'John Doe',
    buildingName: 'localhost',
    streetName: '127.0.0.1',
    postTown: 'Internet',
    postCode: '80',
    officeLocation: 'Cape Town',
  },
};

export const reducer = createReducer(
  initialState,
  on(AuthApiActions.loginUserProfile, (state, { user }) => ({
    ...state,
    user,
  })),
  on(UserProfileActions.userProfileAddress, (state, { address }) => ({
    ...state,
    ...address,
  })),
  on(AuthActions.logout, () => initialState)
  // on(AuthActions.loadAuths, state => state),
  // on(AuthActions.loadAuthsSuccess, (state, action) => state),
  // on(AuthActions.loadAuthsFailure, (state, action) => state),
);

export const getUser = (state: State) => state.user;
export const getUserAddress = (state: State) => state.address;
