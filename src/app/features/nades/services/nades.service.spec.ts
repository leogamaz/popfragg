import { TestBed } from '@angular/core/testing';

import { NadesService } from './nades.service';

describe('NadesService', () => {
  let service: NadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
