import { TestBed } from '@angular/core/testing';

import { TargetedMuscleService } from './targeted-muscle.service';

describe('TargetedMuscleService', () => {
  let service: TargetedMuscleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TargetedMuscleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
