import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Booksuccsses } from './booksuccsses';

describe('Booksuccsses', () => {
  let component: Booksuccsses;
  let fixture: ComponentFixture<Booksuccsses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Booksuccsses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Booksuccsses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
