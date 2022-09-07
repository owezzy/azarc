import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import {
  UserAddressModel,
  workOfficeLocation,
} from '../models/user-address.model';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss'],
})
export class UserAddressComponent {
  form = new FormGroup({});
  model: UserAddressModel = {} as UserAddressModel;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'recipientName',
      type: 'input',
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

  constructor() {}

  onSubmit(model) {
    console.log(model);
  }
}
