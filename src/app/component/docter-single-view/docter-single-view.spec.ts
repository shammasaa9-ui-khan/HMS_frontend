import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocterSingleView } from './docter-single-view';

describe('DocterSingleView', () => {
  let component: DocterSingleView;
  let fixture: ComponentFixture<DocterSingleView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocterSingleView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocterSingleView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
