import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDashbord } from './doctor-dashbord';

describe('DoctorDashbord', () => {
  let component: DoctorDashbord;
  let fixture: ComponentFixture<DoctorDashbord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorDashbord]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorDashbord);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
