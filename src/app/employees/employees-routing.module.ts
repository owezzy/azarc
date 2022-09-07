import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeTableComponent } from './containers/employee-table/employee-table.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeTableComponent,
    data: { title: 'Find Employee' },
  },
  // {
  //   path: ':id',
  //   component: '',
  //   canActivate: [],
  //   data: { title: 'Employee details' },
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
