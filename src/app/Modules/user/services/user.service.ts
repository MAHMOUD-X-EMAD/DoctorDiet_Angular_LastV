import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { IPatient } from '../../doctor/Interface/IPatient';
import { LoginService } from '../../auth/Services/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private router: Router, private _LoginService:LoginService) {

  }

  GetPatientById(patientId:string):Observable<IPatient>{
    return this.httpClient.get<IPatient>(`http://localhost:5268/api/Patient/patientDTO/${patientId}`).pipe(catchError((err)=>{
      return throwError(()=>err.message ||"server error");
    }));
  }
  getAllPatientData():Observable<any>
  {
    let patientId = this._LoginService.getUserId();
    return this.httpClient.get(`http://localhost:5268/api/Patient/patientDTO/${patientId}`)
  }
  getCurrentDay(customPlanId:number):Observable<any>
  {
    return this.httpClient.get(`http://localhost:5268/api/CustomPlan/GetDayCustomPlan?customPlanId=${customPlanId}`)
  }
  GetIFPatientInSubscription(userID:string):Observable<any>
  {
    return this.httpClient.get(`http://localhost:5268/api/Patient/GetIFPatientInSubscription/${userID}`)
  }
}