import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuth0ProfileComponent } from './user-auth0-profile.component';

describe('UserAuth0ProfileComponent', () => {
  let component: UserAuth0ProfileComponent;
  let fixture: ComponentFixture<UserAuth0ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserAuth0ProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAuth0ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
