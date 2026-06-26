import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDepartment } from './update-department';

describe('UpdateDepartment', () => {
  let component: UpdateDepartment;
  let fixture: ComponentFixture<UpdateDepartment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDepartment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDepartment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
