import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { IPatient } from '../Interface/IPatient';
import { PatientService } from '../Service/patient.service';
import { LoginService } from '../../auth/Services/login.service';

@Component({
  selector: 'app-patient-follow-up',
  templateUrl: './patient-follow-up.component.html',
  styleUrls: ['./patient-follow-up.component.scss']
})
export class PatientFollowUpComponent {
  PatientList:IPatient[]=[]
  errorMessage:string=""
  DoctorId:string=this._loginSefvice.getUserId();


  constructor(private patient:PatientService,private router:Router, private _loginSefvice: LoginService){
    
  }

  ngOnInit() {
    this.patient.GetPatientsByDoctorId(this.DoctorId).subscribe({
      next:data=>{
        this.PatientList=data
        console.log(data)
      },
      error:err=>this.errorMessage=err
     })
   
  }

  navig( Patientid:string){
    this.router.navigate([`/doctor/dash/PatienDe/${Patientid}`])

  }

}
