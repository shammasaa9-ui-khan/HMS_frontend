import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminappointment } from './adminappointment';

describe('Adminappointment', () => {
  let component: Adminappointment;
  let fixture: ComponentFixture<Adminappointment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adminappointment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adminappointment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
