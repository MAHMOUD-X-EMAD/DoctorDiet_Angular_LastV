import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IConnect } from '../../doctor/Interface/IConnect';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _HttpClient: HttpClient) {
  }


  GetPatientInfo(PatientID:string):Observable<any>{
  
     return this._HttpClient.get(`http://localhost:5268/api/Patient/patientDataDTO/${PatientID}`)
 }

 
 
ChangePatientPass(userData:object):Observable<any>{
  
 return this._HttpClient.post("http://localhost:5268/api/Patient/ChangePassWord",userData)
}

ChangeAdminPass(userData:object):Observable<any>{
  
 return this._HttpClient.post("http://localhost:5268/api/Admin/ChangePassowrd",userData)
}
getpatientSubscribtion(userId:string){
 return this._HttpClient.get(`http://localhost:5268/api/Patient/GetPatientHistory/${userId}`)
}
Cancel(userdata:IConnect):Observable<any>{
 return this._HttpClient.put(`http://localhost:5268/api/Patient/CanceledSubscription`,userdata)
}
EditProfile(editUserForm: any):Observable<any> {
  console.log(editUserForm)

  return this._HttpClient.put("http://localhost:5268/api/Patient/EditPatientData", editUserForm)
}
}
