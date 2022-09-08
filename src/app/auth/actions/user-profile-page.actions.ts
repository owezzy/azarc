import { createAction, props } from '@ngrx/store';

export const userProfileAddress = createAction(
  '[User-Profile] Update Address',
  props<{ address: any }>()
);

export const userProfileAddressUpdateSuccess = createAction(
  '[User-Profile] Update Address Successful',
  props<{ address: any }>()
);
