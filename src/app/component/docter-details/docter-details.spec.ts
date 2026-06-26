import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocterDetails } from './docter-details';

describe('DocterDetails', () => {
  let component: DocterDetails;
  let fixture: ComponentFixture<DocterDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocterDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocterDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
