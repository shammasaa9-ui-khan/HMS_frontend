import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentDoctor } from './department-doctor';

describe('DepartmentDoctor', () => {
  let component: DepartmentDoctor;
  let fixture: ComponentFixture<DepartmentDoctor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentDoctor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentDoctor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
