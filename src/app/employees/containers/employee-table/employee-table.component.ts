import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ListColumn } from '../../../../shared/list/list-column.model';
import { MatPaginator } from '@angular/material/paginator';
import { filter, Observable, of, ReplaySubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from './employee-create-update/employee.model';
import { EMPLOYEES_TABLE_DEMO_DATA } from './all-in-one-table.demo';
import { EmployeeCreateUpdateComponent } from './employee-create-update/employee-create-update.component';
import { fadeInUpAnimation } from '../../../../shared/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../../shared/animations/fade-in-right.animation';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class EmployeeTableComponent implements OnInit, AfterViewInit {
  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Employee[]> = new ReplaySubject<Employee[]>(1);
  data$: Observable<Employee[]> = this.subject$.asObservable();
  employees: Employee[];

  @Input()
  columns: ListColumn[] = [
    { name: 'Checkbox', property: 'checkbox', visible: false },
    { name: 'Image', property: 'image', visible: true },
    { name: 'Name', property: 'name', visible: true, isModelProperty: true },
    {
      name: 'First Name',
      property: 'firstName',
      visible: false,
      isModelProperty: true,
    },
    {
      name: 'Last Name',
      property: 'lastName',
      visible: false,
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

  constructor(private dialog: MatDialog) {}

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return of(
      EMPLOYEES_TABLE_DEMO_DATA.map((customer) => new Employee(customer))
    );
  }

  ngOnInit() {
    this.getData().subscribe((customers) => {
      this.subject$.next(customers);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter((data) => !!data)).subscribe((customers) => {
      this.employees = customers;
      this.dataSource.data = customers;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createCustomer() {
    this.dialog
      .open(EmployeeCreateUpdateComponent)
      .afterClosed()
      .subscribe((customer: Employee) => {
        /**
         * Customer is the updated customer (if the user pressed Save - otherwise it's null)
         */
        if (customer) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          this.employees.unshift(new Employee(customer));
          this.subject$.next(this.employees);
        }
      });
  }

  updateCustomer(customer) {
    this.dialog
      .open(EmployeeCreateUpdateComponent, {
        data: customer,
      })
      .afterClosed()
      .subscribe((customer) => {
        /**
         * Customer is the updated customer (if the user pressed Save - otherwise it's null)
         */
        if (customer) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.employees.findIndex(
            (existingCustomer) => existingCustomer.id === customer.id
          );
          this.employees[index] = new Employee(customer);
          this.subject$.next(this.employees);
        }
      });
  }

  deleteCustomer(customer) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.employees.splice(
      this.employees.findIndex(
        (existingCustomer) => existingCustomer.id === customer.id
      ),
      1
    );
    this.subject$.next(this.employees);
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
