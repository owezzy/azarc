import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ListColumn } from '../../../../shared/list/list-column.model';
import { MatPaginator } from '@angular/material/paginator';
import { filter, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from './employee-create-update/employee.model';
import { EmployeesInterface } from '../../models/all-in-one-table.demo';
import { EmployeeCreateUpdateComponent } from './employee-create-update/employee-create-update.component';
import { fadeInUpAnimation } from '../../../../shared/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../../shared/animations/fade-in-right.animation';
import { Store } from '@ngrx/store';
import * as EmployeesActions from '../../actions/employees.actions';
import * as EmployeeActions from '../../actions/employee.actions';
import * as fromEmployees from '../../reducers/index';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class EmployeeTableComponent implements OnInit, AfterViewInit {
  // handle subscriptions
  subSink = new SubSink();
  /**
   * Simulating a service with HTTP that returns Observables
   * I am using NgRx Store as data store use selectors to get data
   */
  data$: Observable<Employee[]> = this.store.select(
    fromEmployees.selectEmployeeCollection
  ) as Observable<Employee[]>;

  @Input()
  columns: ListColumn[] = [
    { name: 'Checkbox', property: 'checkbox', visible: false },
    { name: 'Image', property: 'image', visible: true },
    { name: 'Name', property: 'name', visible: false, isModelProperty: true },
    {
      name: 'First Name',
      property: 'firstName',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Last Name',
      property: 'lastName',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Street',
      property: 'street',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Zipcode',
      property: 'zipcode',
      visible: true,
      isModelProperty: true,
    },
    { name: 'City', property: 'city', visible: true, isModelProperty: true },
    {
      name: 'Phone',
      property: 'phoneNumber',
      visible: true,
      isModelProperty: true,
    },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  pageSize = 10;
  dataSource: MatTableDataSource<Employee> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private store: Store) {}

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  ngOnInit() {
    this.store.dispatch(EmployeesActions.loadEmployees());

    this.dataSource = new MatTableDataSource();

    this.subSink.add(
      this.data$.pipe(filter((data) => !!data)).subscribe((customers) => {
        // console.log('this.data$.Sub', customers);
        this.dataSource.data = customers;
      })
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createCustomer() {
    this.subSink.add(
      this.dialog
        .open(EmployeeCreateUpdateComponent)
        .afterClosed()
        .subscribe((employee: Employee) => {
          /**
           * Employee is the updated employee (if the user pressed Save - otherwise it's null)
           */
          if (employee) {
            /**
             * Here we are updating our local array.
             * You would probably make an HTTP request here.
             */
            const data: any = employee;

            this.store.dispatch(EmployeeActions.createEmployee({ data }));
          }
        })
    );
  }

  updateCustomer(employee) {
    this.subSink.add(
      this.dialog
        .open(EmployeeCreateUpdateComponent, {
          data: employee,
        })
        .afterClosed()
        .subscribe((employee) => {
          /**
           * Employee is the updated employee (if the user pressed Save - otherwise it's null)
           */
          if (employee) {
            /**
             * Here we are updating our local array.
             * You would probably make an HTTP request here.
             */

            const data: EmployeesInterface = employee;

            this.store.dispatch(EmployeeActions.updateEmployee({ data }));
          }
        })
    );
  }

  deleteCustomer(employee) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */

    const data: EmployeesInterface = employee;
    // console.log(data);

    this.store.dispatch(EmployeeActions.deleteEmployee({ data }));
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }
}
