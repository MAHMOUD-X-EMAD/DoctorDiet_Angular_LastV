import { TestBed } from '@angular/core/testing';

import { CustomPlanService } from './custom-plan.service';

describe('CustomPlanService', () => {
  let service: CustomPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
