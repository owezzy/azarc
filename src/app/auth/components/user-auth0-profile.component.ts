import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAddressModel } from '../models/user-address.model';

@Component({
  selector: 'app-user-auth0-profile',
  templateUrl: './user-auth0-profile.component.html',
  styleUrls: ['./user-auth0-profile.component.scss'],
})
export class UserAuth0ProfileComponent {
  @Input() auth0Profile$: Observable<any>;
  @Input() address$: UserAddressModel;
  constructor() {}
}
