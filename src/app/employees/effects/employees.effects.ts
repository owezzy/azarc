import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as EmployeesActions from '../actions/employees.actions';
import { EMPLOYEES_TABLE_DEMO_DATA } from '../models/all-in-one-table.demo';
import { Employee } from '../containers/employee-table/employee-create-update/employee.model';

@Injectable()
export class EmployeesEffects {
  loadEmployees$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeesActions.loadEmployees),
      concatMap(() =>
        /** Return Employees local data observable. Replace with HTTP observable API request */
        this.getData().pipe(
          map((employees) =>
            EmployeesActions.loadEmployeesSuccess({ employees })
          ),
          catchError((error) =>
            of(EmployeesActions.loadEmployeesFailure({ error }))
          )
        )
      )
    );
  });

  getData() {
    return of(
      EMPLOYEES_TABLE_DEMO_DATA.map((employee) => new Employee(employee))
    );
  }
  constructor(private actions$: Actions) {}
}
