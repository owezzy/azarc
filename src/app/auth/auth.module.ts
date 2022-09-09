import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { LogoutConfirmationDialogComponent } from './components/logout-confirmation-dialog.component';
import { MaterialModule } from '../material';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from '../auth/reducers/index';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import { LoginFormComponent } from './components/login-form.component';
import { environment } from '../../environments/environment';
import { AuthModule as AuthOModule } from '@auth0/auth0-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserProfilePageComponent } from './containers/user-profile-page/user-profile-page.component';
import { UserAuth0ProfileComponent } from './components/user-auth0-profile.component';
import { UserAddressComponent } from './components/user-address.component';
import { FormlyModule } from '@ngx-formly/core';

export const COMPONENTS = [
  LoginFormComponent,
  LoginPageComponent,
  LogoutConfirmationDialogComponent,
  UserProfilePageComponent,
  UserAuth0ProfileComponent,
  UserAddressComponent,
];

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AuthOModule.forRoot({
      domain: environment.domain,
      clientId: environment.clientId,
    }),
    StoreModule.forFeature({
      name: fromAuth.authFeatureKey,
      reducer: fromAuth.reducers,
    }),
    EffectsModule.forFeature([AuthEffects]),
    FormlyModule,
  ],
  declarations: COMPONENTS,
})
export class AuthModule {}
