import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './containers/login-page.component';
import { LoginFormComponent } from './components/login-form.component';
import { LogoutConfirmationDialogComponent } from './components/logout-confirmation-dialog.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    LoginFormComponent,
    LogoutConfirmationDialogComponent,
  ],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
