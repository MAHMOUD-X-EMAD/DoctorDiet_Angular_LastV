import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../Service/doctor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plan-dash',
  templateUrl: './plan-dash.component.html',
  styleUrls: ['./plan-dash.component.scss']
})
export class PlanDashComponent implements OnInit {
data:any
planId !:any

 constructor(private doctorService:DoctorService,private _ActivatedRoute:ActivatedRoute)  {
 
  
 }
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.planId = params.get('id');
      this.doctorService.GetDaysByplanID(this.planId).subscribe(Response => {
        this.data = Response;
        console.log("dayssss",this.data)
      });
    });
 
  }


}
