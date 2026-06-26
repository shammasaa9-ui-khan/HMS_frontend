import { ComponentFixture, TestBed } from '@angular/core/testing';

import { About2 } from './about2';

describe('About2', () => {
  let component: About2;
  let fixture: ComponentFixture<About2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(About2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
