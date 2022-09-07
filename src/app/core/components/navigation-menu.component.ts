import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthStateService } from '../../auth/services';

@Component({
  selector: 'app-navigation-menu',
  template: `
    <mat-nav-list>
      <a
        mat-list-item
        routerLinkActive="active-link"
        [routerLink]="['profile']"
      >
        <mat-icon class="nav-icons">person</mat-icon>
        Profile
      </a>
      <a
        mat-list-item
        routerLinkActive="active-link"
        [routerLink]="['employees']"
      >
        <mat-icon class="nav-icons">person_search</mat-icon>
        Employees
      </a>
      <a mat-list-item routerLinkActive="active-link" (click)="sigOut()">
        <mat-icon class="nav-icons">backspace </mat-icon>
        SignOut
      </a>
    </mat-nav-list>
  `,
  styleUrls: ['./navigation-menu.component.css'],
})
export class NavigationMenuComponent {
  @Output() navigate = new EventEmitter();

  constructor(private authState: AuthStateService) {}

  sigOut() {
    this.authState.logout();
  }
}
