import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromEmployees from '../reducers/employees.reducer';
import * as fromCollection from '../reducers/collection.reducer';

import * as fromRoot from '../../Store/index';
import { Employee } from '../containers/employee-table/employee-create-update/employee.model';

export const employeesFeatureKey = 'employees';

export interface EmployeesState {
  [fromEmployees.employeesFeatureKey]: fromEmployees.State;
  [fromCollection.collectionFeatureKey]: fromCollection.State;
}

export interface State extends fromRoot.State {
  [employeesFeatureKey]: EmployeesState;
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: EmployeesState | undefined, action: Action) {
  return combineReducers({
    [fromEmployees.employeesFeatureKey]: fromEmployees.reducer,
    [fromCollection.collectionFeatureKey]: fromCollection.reducer,
  })(state, action);
}

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `books` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 *   constructor(state$: Observable<State>) {
 *     this.booksState$ = state$.pipe(select(getEmployeesState));
 *   }
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const selectEmployeesState =
  createFeatureSelector<EmployeesState>(employeesFeatureKey);

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const selectEmployeeEntitiesState = createSelector(
  selectEmployeesState,
  (state) => state.employees
);

export const selectSelectedEmployeeId = createSelector(
  selectEmployeeEntitiesState,
  fromEmployees.selectId
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: selectEmployeeIds,
  selectEntities: selectEmployeeEntities,
  selectAll: selectAllEmployees,
  selectTotal: selectTotalEmployees,
} = fromEmployees.adapter.getSelectors(selectEmployeeEntitiesState);

export const selectSelectedEmployee = createSelector(
  selectEmployeeEntities,
  selectSelectedEmployeeId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of books in the store.
 */

export const selectCollectionState = createSelector(
  selectEmployeesState,
  (state) => state.collection
);

export const selectCollectionLoaded = createSelector(
  selectCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  selectCollectionState,
  fromCollection.getLoading
);
export const selectCollectionEmployeeIds = createSelector(
  selectCollectionState,
  fromCollection.getIds
);

export const selectEmployeeCollection = createSelector(
  selectEmployeeEntities,
  selectCollectionEmployeeIds,
  (entities, ids) => {
    return ids
      .map((id) => entities[id])
      .filter((employee): employee is Employee => employee != null);
  }
);

export const isSelectedEmployeeInCollection = createSelector(
  selectCollectionEmployeeIds,
  selectSelectedEmployeeId,
  (ids, selected) => {
    return !!selected && ids.indexOf(selected) > -1;
  }
);
