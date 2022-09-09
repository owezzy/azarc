import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import {
  UserAddressModel,
  workOfficeLocation,
} from '../models/user-address.model';
import { Store } from '@ngrx/store';
import { UserProfileActions } from '../actions';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss'],
})
export class UserAddressComponent implements OnInit {
  @Input() AddressDataValues: UserAddressModel;

  form = new FormGroup({});
  model: UserAddressModel = {} as UserAddressModel;
  options: FormlyFormOptions = {};
  public fields: FormlyFieldConfig[];
  localValues: any;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.localValues = this.AddressDataValues;
    this.fields = [
      {
        key: 'recipientName',
        type: 'input',
        defaultValue: this.localValues.recipientName,
        props: {
          appearance: 'outline',
          label: 'recipientName',
          placeholder: 'Name of Recipient',
          required: true,
        },
      },
      {
        key: 'buildingName',
        type: 'input',
        defaultValue: this.localValues.buildingName,
        props: {
          appearance: 'outline',
          label: 'buildingName',
          placeholder: 'Name of Building',
          required: true,
        },
      },
      {
        key: 'streetName',
        type: 'input',
        defaultValue: this.localValues.streetName,

        props: {
          appearance: 'outline',
          label: 'streetName',
          placeholder: 'Name of Street',
          required: true,
        },
      },
      {
        key: 'postTown',
        type: 'input',
        defaultValue: this.localValues.postTown,

        props: {
          appearance: 'outline',
          label: 'postTown',
          placeholder: 'Name of post Town',
          required: true,
        },
      },
      ,
      {
        key: 'postCode',
        type: 'input',
        defaultValue: this.localValues.postCode,
        props: {
          label: 'postCode',
          placeholder: 'Name of post Code',
          required: true,
          appearance: 'outline',
        },
      },
      {
        key: 'officeLocation',
        type: 'select',
        defaultValue: this.localValues.officeLocation,
        props: {
          appearance: 'outline',
          label: 'workOfficeLocation',
          placeholder: 'workOfficeLocation',
          required: true,
          options: [
            {
              value: workOfficeLocation.Cape_Town,
              label: workOfficeLocation.Cape_Town,
            },
            {
              value: workOfficeLocation.London,
              label: workOfficeLocation.London,
            },
            {
              value: workOfficeLocation.Los_Angeles,
              label: workOfficeLocation.Los_Angeles,
            },
          ],
        },
      },
    ];
  }

  onSubmit(values) {
    const address = { address: values };
    this.store.dispatch(UserProfileActions.userProfileAddress({ address }));
    console.log(address);
  }
}
