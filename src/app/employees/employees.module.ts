import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeTableComponent } from './containers/employee-table/employee-table.component';

@NgModule({
  declarations: [EmployeeTableComponent],
  imports: [CommonModule, EmployeesRoutingModule],
})
export class EmployeesModule {}
