import { TestBed } from '@angular/core/testing';

import { BodyDiagramService } from './body-diagram.service';

describe('BodyDiagramService', () => {
  let service: BodyDiagramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodyDiagramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
