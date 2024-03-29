import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { UserProfilePageComponent } from './containers/user-profile-page/user-profile-page.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, data: { title: 'Login' } },
  {
    path: 'profile',
    component: UserProfilePageComponent,
    canActivate: [AuthGuard],
    data: { title: 'Profile' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
