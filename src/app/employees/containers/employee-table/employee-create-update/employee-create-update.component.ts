import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from './employee.model';

@Component({
  selector: 'app-employee-create-update',
  templateUrl: './employee-create-update.component.html',
  styleUrls: ['./employee-create-update.component.scss'],
})
export class EmployeeCreateUpdateComponent implements OnInit {
  static id = 100;

  form: FormGroup;
  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<EmployeeCreateUpdateComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Employee;
    }

    this.form = this.fb.group({
      id: [EmployeeCreateUpdateComponent.id++],
      firstName: [this.defaults.firstName || '', Validators.required],
      lastName: [this.defaults.lastName || '', Validators.required],
      street: [this.defaults.street || '', Validators.required],
      city: [this.defaults.city || '', Validators.required],
      zipcode: [this.defaults.zipcode || '', Validators.required],
      phoneNumber: [this.defaults.phoneNumber || '', Validators.required],
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createEmployee();
    } else if (this.mode === 'update') {
      this.updateEmployee();
    }
  }

  createEmployee() {
    const employee = this.form.value;
    this.dialogRef.close(employee);
  }

  updateEmployee() {
    const employee = this.form.value;
    employee.id = this.defaults.id;

    this.dialogRef.close(employee);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
