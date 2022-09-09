import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../reducers/index';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss'],
})
export class UserProfilePageComponent {
  user$ = this.store.select(fromAuth.selectUser);
  userAddress$ = this.store.select(fromAuth.selectUserAddress);

  constructor(private store: Store) {}
}
