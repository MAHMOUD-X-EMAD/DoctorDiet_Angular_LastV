import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPlanDayMealsComponent } from './custom-plan-day-meals.component';

describe('CustomPlanDayMealsComponent', () => {
  let component: CustomPlanDayMealsComponent;
  let fixture: ComponentFixture<CustomPlanDayMealsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomPlanDayMealsComponent]
    });
    fixture = TestBed.createComponent(CustomPlanDayMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
