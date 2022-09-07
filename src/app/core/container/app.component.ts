import { Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { routeAnimations } from 'src/shared/animations/route.animations';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../auth/reducers/index';
import { Observable } from 'rxjs';
import { AuthActions } from '../../auth/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
})
export class AppComponent {
  loggedIn$: Observable<boolean>;

  constructor(public media: MediaObserver, private store: Store) {
    this.loggedIn$ = this.store.select(fromAuth.selectLoggedIn);
  }
  logout() {
    this.store.dispatch(AuthActions.logoutConfirmation());
  }
}
