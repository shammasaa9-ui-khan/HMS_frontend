import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAbout } from './main-about';

describe('MainAbout', () => {
  let component: MainAbout;
  let fixture: ComponentFixture<MainAbout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainAbout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainAbout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
