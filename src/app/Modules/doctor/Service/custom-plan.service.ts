import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPlanService {
  baseurl = 'http://localhost:5268/api/CustomPlan'
  constructor(private httpClient: HttpClient, private router: Router) {



  }

  GetDaysCustomPlan(customPlanId:number):Observable<any>{
    return this.httpClient.get<any>(`${this.baseurl}/GetDayCustomPlanByCusPlanId/${customPlanId}`).pipe(catchError((err)=>{
      return throwError(()=>err.message ||"server error");
    }));
  }
  
  GetMealByDayID(customPlanDayId:number):Observable<any>{
    return this.httpClient.get<any>(`${this.baseurl}/GetMealCustomPlanByCusDayId/${customPlanDayId}`).pipe(catchError((err)=>{
      return throwError(()=>err.message ||"server error");
    }));
  }
  GetCustomMeal(customPlanDayId:number):Observable<any>{
    return this.httpClient.get<any>(`http://localhost:5268/api/CustomPlan/GetCustomMealByID/${customPlanDayId}`).pipe(catchError((err)=>{
      return throwError(()=>err.message ||"server error");
    }));
  }
}
