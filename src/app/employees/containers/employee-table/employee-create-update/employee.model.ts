import { EmployeesInterface } from '../../../models/all-in-one-table.demo';

export class Employee implements EmployeesInterface {
  id: string;
  firstName: string;
  lastName: string;
  street: string;
  zipcode: string;
  city: string;
  phoneNumber: string;
  mail: string;

  constructor(employee) {
    this.id = employee.id;
    this.firstName = employee.firstName;
    this.lastName = employee.lastName;
    this.street = employee.street;
    this.zipcode = employee.zipcode;
    this.city = employee.city;
    this.phoneNumber = employee.phoneNumber;
    this.mail = employee.mail;
  }

  get name() {
    let name = '';

    if (this.firstName && this.lastName) {
      name = this.firstName + ' ' + this.lastName;
    } else if (this.firstName) {
      name = this.firstName;
    } else if (this.lastName) {
      name = this.lastName;
    }

    return name;
  }

  set name(value) {}

  get address() {
    return `${this.street}, ${this.zipcode} ${this.city}`;
  }

  set address(value) {}
}
