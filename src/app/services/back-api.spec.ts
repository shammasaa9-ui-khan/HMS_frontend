import { TestBed } from '@angular/core/testing';

import { BackApi } from './back-api';

describe('BackApi', () => {
  let service: BackApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
