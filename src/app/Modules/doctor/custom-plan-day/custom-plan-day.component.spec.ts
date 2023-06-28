import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPlanDayComponent } from './custom-plan-day.component';

describe('CustomPlanDayComponent', () => {
  let component: CustomPlanDayComponent;
  let fixture: ComponentFixture<CustomPlanDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomPlanDayComponent]
    });
    fixture = TestBed.createComponent(CustomPlanDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
