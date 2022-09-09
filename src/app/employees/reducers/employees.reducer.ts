import { Action, createReducer, on } from '@ngrx/store';
import * as EmployeesActions from '../actions/employees.actions';
import * as EmployeeActions from '../actions/employee.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { EmployeesInterface } from '../models/all-in-one-table.demo';
import { Employee } from '../containers/employee-table/employee-create-update/employee.model';

export const employeesFeatureKey = 'employees';

// use entities from ngrx to get helper functions
export interface State extends EntityState<Employee> {
  selectedEmployeeId: string | null;
}

export const adapter: EntityAdapter<Employee> = createEntityAdapter<Employee>({
  selectId: (employee: Employee) => employee.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedEmployeeId: null,
});

export const reducer = createReducer(
  initialState,

  on(EmployeeActions.createEmployee, (state, { data }) =>
    adapter.addOne(data, state)
  ),
  on(EmployeeActions.updateEmployee, (state, { data }) =>
    adapter.upsertOne(data, state)
  ),
  on(EmployeeActions.deleteEmployee, (state, { data }) =>
    adapter.removeOne(data.id, state)
  ),
  on(EmployeesActions.loadEmployees, (state) => state),
  on(EmployeesActions.loadEmployeesSuccess, (state, { employees }) =>
    adapter.addMany(employees, state)
  ),
  on(EmployeesActions.loadEmployeesFailure, (state, action) => state)
);

export const selectId = (state: State) => state.selectedEmployeeId;
