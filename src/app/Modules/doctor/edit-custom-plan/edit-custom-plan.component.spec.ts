import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomPlanComponent } from './edit-custom-plan.component';

describe('EditCustomPlanComponent', () => {
  let component: EditCustomPlanComponent;
  let fixture: ComponentFixture<EditCustomPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCustomPlanComponent]
    });
    fixture = TestBed.createComponent(EditCustomPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
