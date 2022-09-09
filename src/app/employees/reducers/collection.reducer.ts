import { createReducer, on } from '@ngrx/store';
import * as EmployeesActions from '../actions/employees.actions';
import * as EmployeeActions from '../actions/employee.actions';

export const collectionFeatureKey = 'collection';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
};

export const reducer = createReducer(
  initialState,
  on(EmployeesActions.loadEmployees, (state) => ({
    ...state,
    loading: true,
  })),
  on(EmployeesActions.loadEmployeesSuccess, (_state, { employees }) => ({
    loaded: true,
    loading: false,
    ids: employees.map((employee) => employee.id),
  })),

  on(EmployeeActions.createEmployee, (state, { data }) => {
    if (state.ids.indexOf(String(data.id)) > -1) {
      return state;
    }
    return {
      ...state,
      ids: [...state.ids, data.id],
    };
  }),

  on(EmployeeActions.deleteEmployee, (state, { data }) => ({
    ...state,
    ids: state.ids.filter((id) => id !== data.id),
  }))
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;
