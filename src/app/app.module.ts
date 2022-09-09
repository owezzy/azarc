import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './core/container/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import {
  NgxUiLoaderConfig,
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
  POSITION,
  SPINNER,
} from 'ngx-ui-loader';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { metaReducers, ROOT_REDUCERS } from './Store';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './core/effects';
import { AuthModule } from './auth';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

const primaryColour = '#e91e63';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: primaryColour,
  bgsColor: primaryColour,
  bgsOpacity: 5,
  overlayColor: 'rgba(74, 74, 74, 0.2)',
  overlayBorderRadius: '50',
  fgsPosition: POSITION.centerCenter,
  bgsPosition: POSITION.bottomCenter,
  blur: 8,
  fgsSize: 144,
  bgsSize: 50,
  bgsType: SPINNER.squareJellyBox, // background spinner type
  fgsType: SPINNER.threeStrings, // foreground spinner type - Http
  hasProgressBar: true,
  pbColor: primaryColour,
  pbThickness: 2,
};
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    CoreModule,
    AppRoutingModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
    FormlyMaterialModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule.forRoot({
      showForeground: true,
      exclude: ['http://localhost:4200/'],
    }),
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        // strictStateImmutability and strictActionImmutability are enabled by default
        // strictStateSerializability: true, disable to play with local JSON
        // strictActionSerializability: true, disable to dispatch JSON as action
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    EffectsModule.forRoot([RouterEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'Azarc Solutions',
      logOnly: environment.ngrx_logs,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
