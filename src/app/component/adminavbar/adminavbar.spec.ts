import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminavbar } from './adminavbar';

describe('Adminavbar', () => {
  let component: Adminavbar;
  let fixture: ComponentFixture<Adminavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adminavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adminavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
