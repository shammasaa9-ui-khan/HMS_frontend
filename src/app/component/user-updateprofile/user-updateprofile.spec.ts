import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateprofile } from './user-updateprofile';

describe('UserUpdateprofile', () => {
  let component: UserUpdateprofile;
  let fixture: ComponentFixture<UserUpdateprofile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserUpdateprofile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserUpdateprofile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
