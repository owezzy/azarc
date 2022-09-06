import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './core/container/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material';
import {
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule,
  NgxUiLoaderModule,
  POSITION,
  SPINNER,
} from 'ngx-ui-loader';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { metaReducers, ROOT_REDUCERS } from './Store';

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
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: environment.domain,
      clientId: environment.clientId,
    }),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
      exclude: ['http://localhost:4200/'],
    }),
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        // strictStateImmutability and strictActionImmutability are enabled by default
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'Azarc Solutions',
      logOnly: environment.ngrx_logs,
    }),
    AuthModule,
    CoreModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
