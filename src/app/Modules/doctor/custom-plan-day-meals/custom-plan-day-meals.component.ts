import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomPlanService } from '../Service/custom-plan.service';

@Component({
  selector: 'app-custom-plan-day-meals',
  templateUrl: './custom-plan-day-meals.component.html',
  styleUrls: ['./custom-plan-day-meals.component.scss']
})
export class CustomPlanDayMealsComponent {
  data: any[] = []
  planId!: any;
  breakFast: any[] = [];
  Lunch: any[] = [];
  Dinner: any[] = [];
  snaks: any[] = [];
  sohor:any[]=[];

  constructor(private CustomPlanService: CustomPlanService, private _ActivatedRoute: ActivatedRoute) {


  }
  ngOnInit(): void {
    console.log("lunch1", this.Lunch);
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.planId = params.get('id');
      this.CustomPlanService.GetMealByDayID(this.planId).subscribe((response: any) => {
        console.log("Res", response); // Check the structure of the response object
        this.data = response;
        console.log("5ra", this.data);
        console.log("lunch", this.Lunch);

        if (this.data && Array.isArray(this.data)) {
          console.log("inside")
          for (let i = 0; i < this.data.length; i++) {

            if (this.data[i].category == 0) {
              console.log("cat0y", this.data[i].category);
              this.breakFast.push(this.data[i]);
            } else if (this.data[i].category == 1) {
              console.log("cat1", this.data[i].category);
              this.Lunch.push(this.data[i]);
            } else if (this.data[i].category == 2) {
              console.log("cat2", this.data[i].category);
              this.Dinner.push(this.data[i]);
            } else if (this.data[i].category == 3) {
              console.log("cat3", this.data[i].category);
              this.snaks.push(this.data[i]);
            }
            else if (this.data[i].category == 4) {
              console.log("cat4", this.data[i].category);
              this.sohor.push(this.data[i]);
            }
          }
        }
      });
    });

    }
}
