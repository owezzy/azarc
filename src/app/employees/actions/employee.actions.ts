import { createAction, props } from '@ngrx/store';
import { EmployeesInterface } from '../models/all-in-one-table.demo';

export const createEmployee = createAction(
  '[Employee] Create Employee',
  props<{ data: any }>()
);

export const updateEmployee = createAction(
  '[Employee] Update Employee',
  props<{ data: any }>()
);

export const deleteEmployee = createAction(
  '[Employee] Delete Employee',
  props<{ data: EmployeesInterface }>()
);
