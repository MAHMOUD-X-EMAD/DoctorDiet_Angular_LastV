import { Component } from '@angular/core';
import { ProfileService } from '../../user/services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IConnect } from '../Interface/IConnect';
import { LoginService } from '../../auth/Services/login.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent {
  data: any
  plans:any
  errorMsg=""
  PatientId:any
  DoctorName:string | undefined
  showConfirmation = false;
  CancelData :IConnect={
    patientId:"",
    doctorID:""
  }
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.PatientId = params.get('Patientid');

    });
    this.GetProfile()

  }
constructor(private _ProfileService:ProfileService,private _ActivatedRoute:ActivatedRoute,private router:Router,private _Auth :LoginService){

}


  GetProfile() {

      this._ProfileService.GetPatientInfo(this.PatientId).subscribe((resp) => {
        this.data = resp;

        console.log(this.data);
      }, error => {
        this.errorMsg = "you dont have access"
      })


  }
  hideConfirmation() {
    this.showConfirmation = false;
  }
  calculateAge(birthDate: string): number {
    const currentDate: Date = new Date();
    const dateOfBirth: Date = new Date(birthDate);

    const ageDiffInMs: number = currentDate.getTime() - dateOfBirth.getTime();
    const ageDate: Date = new Date(ageDiffInMs);
    const calculatedAge: number = Math.abs(ageDate.getUTCFullYear() - 1970);

    return calculatedAge;
  }

  GetSubscribtion() {
    this._ProfileService.getpatientSubscribtion(this.PatientId)
      .subscribe((resp) => {
        this.plans=resp
        console.log("jjkjk",this.plans)
      }, error => {
        console.log(error)
      }
      )
  }
  Cancel(userid:string){
    this.CancelData.patientId=userid;
    this.CancelData.doctorID=this._Auth.getUserId()
console.log(this.CancelData);
        this._ProfileService.Cancel(this.CancelData).subscribe((resp)=>{
      console.log(resp)
       if(resp.msg =="Cancled"){
        this.showConfirmation = true;
       }

})

  }
  NavigateToDays(Id:any){
    this.router.navigate([`/doctor/dash/CustomPlanDays/${Id}`])
  }
}
