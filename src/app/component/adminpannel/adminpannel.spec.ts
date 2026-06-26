import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminpannel } from './adminpannel';

describe('Adminpannel', () => {
  let component: Adminpannel;
  let fixture: ComponentFixture<Adminpannel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adminpannel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adminpannel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
