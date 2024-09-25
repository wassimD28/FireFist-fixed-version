import { TestBed } from '@angular/core/testing';

import { ValueCounterService } from './value-counter.service';

describe('ValueCounterService', () => {
  let service: ValueCounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValueCounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
