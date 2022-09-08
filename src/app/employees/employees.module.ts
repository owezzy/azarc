import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeTableComponent } from './containers/employee-table/employee-table.component';
import { ListModule } from '../../shared/list/list.module';
import { EmployeeCreateUpdateModule } from './containers/employee-table/employee-create-update/employee-create-update.module';
import { MaterialModule } from '../material';
import { PageLayoutModule } from '../../shared/page-layout/page-layout.module';

@NgModule({
  declarations: [EmployeeTableComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    EmployeeCreateUpdateModule,
    ListModule,
    PageLayoutModule,
    MaterialModule,
  ],
})
export class EmployeesModule {}
