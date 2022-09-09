import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout-confirmation-dialog',
  template: ` <h2 mat-dialog-title>Logout</h2>
    <mat-dialog-content>Are you sure you want to logout?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-button [mat-dialog-close]="true">OK</button>
    </mat-dialog-actions>`,
  styleUrls: ['./logout-confirmation-dialog.component.scss'],
})
export class LogoutConfirmationDialogComponent {
  constructor() {}
}
