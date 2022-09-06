import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './core/container/not-found-page.component';
import { LoginPageComponent } from './auth/containers/login-page.component';

const routes: Routes = [
  // { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent, data: { title: 'Login' } },

  {
    path: '**',
    component: NotFoundPageComponent,
    data: { title: 'Not found' },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      relativeLinkResolution: 'legacy',
      onSameUrlNavigation: 'ignore',
      paramsInheritanceStrategy: 'always',
      enableTracing: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
