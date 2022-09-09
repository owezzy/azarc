import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeTableComponent } from './containers/employee-table/employee-table.component';
import { ListModule } from '../../shared/list/list.module';
import { EmployeeCreateUpdateModule } from './containers/employee-table/employee-create-update/employee-create-update.module';
import { MaterialModule } from '../material';
import { PageLayoutModule } from '../../shared/page-layout/page-layout.module';
import { StoreModule } from '@ngrx/store';
import * as fromEmployees from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { EmployeesEffects } from './effects/employees.effects';

@NgModule({
  declarations: [EmployeeTableComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    EmployeeCreateUpdateModule,
    ListModule,
    PageLayoutModule,
    MaterialModule,
    StoreModule.forFeature(
      fromEmployees.employeesFeatureKey,
      fromEmployees.reducers
    ),
    EffectsModule.forFeature([EmployeesEffects]),
  ],
})
export class EmployeesModule {}
