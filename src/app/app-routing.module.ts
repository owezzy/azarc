import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './core/container/not-found-page.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  {
    path: 'employees',
    loadChildren: () =>
      import('./employees/employees.module').then((m) => m.EmployeesModule),
    canActivate: [AuthGuard],
  },
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
