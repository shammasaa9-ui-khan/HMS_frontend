import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDepartment } from './admin-department';

describe('AdminDepartment', () => {
  let component: AdminDepartment;
  let fixture: ComponentFixture<AdminDepartment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDepartment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDepartment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
