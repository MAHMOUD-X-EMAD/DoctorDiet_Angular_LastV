import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomPlanService } from '../Service/custom-plan.service';

@Component({
  selector: 'app-custom-plan-day',
  templateUrl: './custom-plan-day.component.html',
  styleUrls: ['./custom-plan-day.component.scss']
})
export class CustomPlanDayComponent {
  data:any
customplanId !:any

 constructor(private customPlanService:CustomPlanService,private _ActivatedRoute:ActivatedRoute)  {


 }
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.customplanId = params.get('customId');
      this.customPlanService.GetDaysCustomPlan(this.customplanId).subscribe(Response => {
        this.data = Response;
        console.log("dayssss",this.data)
      });
    });

  }
}
