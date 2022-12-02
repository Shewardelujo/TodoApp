import { TestBed } from '@angular/core/testing';

import { TryBehaviorSubjectService } from './try-behavior-subject-service.service';

describe('TryBehaviorSubjectService', () => {
  let service: TryBehaviorSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TryBehaviorSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
