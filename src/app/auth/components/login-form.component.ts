import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  template: `
    <mat-card>
      <mat-card-title>Welcome to Azarc Solutions</mat-card-title>
      <mat-card-content
        ><p>
          We noticed you're not Logged In, Click the Button to Login
        </p></mat-card-content
      >
      <mat-card-actions>
        <button mat-raised-button fxFlex color="accent" (click)="Auth0Login()">
          Login
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() errorMessage!: string | null;

  @Output() submitted = new EventEmitter<any>();
  @Output() initializeLogin = new EventEmitter<any>();

  form: FormGroup = new FormGroup({
    username: new FormControl('ngrx'),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }

  Auth0Login() {
    this.initializeLogin.emit();
  }
}
