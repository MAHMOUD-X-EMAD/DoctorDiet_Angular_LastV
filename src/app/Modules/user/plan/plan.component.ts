import { Component, OnInit } from '@angular/core';
import { IPatient } from '../../doctor/Interface/IPatient';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../auth/Services/register.service';
import { UserService } from '../services/user.service';
import { LoginService } from '../../auth/Services/login.service';
import { INote } from '../interface/INote';
import { INotePatient } from '../interface/INotePatient';
import { IGetPatientNote } from '../interface/IGetPatientNote';
import { NotesService } from '../services/notes.service';
import { IListOfPatientNotes } from '../interface/IListofPatientNotes';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private _router: Router, private _UserService: UserService, private Auth: LoginService,private _NotesService : NotesService) { }

  ISsubscribe !:string
  CurrentPatient!: IPatient;
  breakfast: any[] = [];
  lunch: any[] = [];
  dinner: any[] = [];
  snaks: any[] = [];
  sohor: any[] = [];
  patientNotes : IListOfPatientNotes[] = []
  doctortNotes : any[] = []
  ISsohor :boolean=false
  ISbreakfast :boolean=false
  ISlunch :boolean=false
  ISsnaks :boolean=false
  ISdinner :boolean=false
  note!: INote;
  PatientCurrentDay : any ={}
  myDoctorId:string=""

  addPatientNote : INotePatient = {
    id: 0,
    patientId: this.Auth.getUserId(),
    dayCustomPlanId: 0,
    text: '',
    doctorId: this.myDoctorId,
    date: new Date()
  }


  getNotesData : IGetPatientNote = {
    patientId: this.Auth.getUserId(),
    dayId: 0
  }


  async ngOnInit() {
    let userID=this.Auth.getUserId()
    
    this._UserService.GetIFPatientInSubscription(userID).subscribe((res)=>{
      console.log(res)
      if(res.msg=="Confirmed"){
        this.ISsubscribe="Confirmed" 
      }
      else if(res.msg=="Canceled"){
        this.ISsubscribe="Canceled"
      }
      else{
        this.ISsubscribe="NotConfirmed"
      }
    })
    this.GetPatient();
    await console.log(this.CurrentPatient)
    console.log(this.Auth.getUserId());
    console.log(this.addPatientNote);
    
    this.getPatientCurrentDay();
    
  }

  GetPatient() {

    this._UserService.GetPatientById(this.Auth.getUserId()).subscribe({
      next: (data: IPatient) => this.CurrentPatient = data,

      error: (err: any) => console.log(err),
    })

    setTimeout(() => console.log(this.CurrentPatient), 1000)
  }

  AddPatientNote(){
    this._NotesService.AddPatientNote(this.addPatientNote).subscribe({
      next: (data: any) => {
        console.log(data)
        this.GetPatientNotes();
      },

      error: (err: any) => console.log(err),
    })
    
  }

  
   GetPatientNotes() {
     this._NotesService.GetPatientNotes(this.getNotesData).subscribe({
      next: (data: IListOfPatientNotes[]) => {
      this.patientNotes = data
      console.log("List Of Notes",this.patientNotes)
    },
      error: (err: any) => console.log(err),
    });
  }

  

  getPatientCurrentDay() {
    console.log("srxdtcfghbjnmk rxtcyvubjnk")
    this._UserService.getAllPatientData().subscribe((response) => {
      console.log("PCD",response);
      this.addPatientNote.doctorId = response['doctorPatientBridge'][0]['doctorID']
      console.log(this.myDoctorId);
      console.log(response['customPlans']);
      let customPlans = response['customPlans']
      console.log("customPlanId",response['customPlans'][customPlans.length - 1]);
      let customPlansId = response['customPlans'][customPlans.length - 1]['id'];


      console.log(customPlansId); 
      this._UserService.getCurrentDay(customPlansId).subscribe((response) => {
        console.log(response);
        var CurrentDay = response;
        this.PatientCurrentDay.dayCustomPlanId = response['id']
        this.addPatientNote.dayCustomPlanId = response['id']
        this.getNotesData.dayId = response['id']
        console.log(this.getNotesData.dayId);
        this.GetPatientNotes();


        console.log(CurrentDay['customMeals'])
        for (let i = 0; i < CurrentDay['customMeals'].length; i++) {

          switch (CurrentDay['customMeals'][i].category) {
            case 0:
              this.breakfast.push(CurrentDay['customMeals'][i]);
              this.ISbreakfast=true
              break;
            case 1:
              this.lunch.push(CurrentDay['customMeals'][i]);
              this.ISlunch=true
              break;
            case 2:
              this.dinner.push(CurrentDay['customMeals'][i]);
              this.ISdinner=true
              break;
            case 3:
              this.sohor.push(CurrentDay['customMeals'][i]);
              this.ISsohor=true
              break;
            case 4:
              this.snaks.push(CurrentDay['customMeals'][i]);
              this.ISsnaks=true
              break;
            default:
              console.log('DayMeals');
              break;
          }
        }

        console.log("Break",this.breakfast)

      })
    })
  }
//Note button ///
addnote(){

  this.note.text="sdcds";//=( document.getElementsByClassName(".notebody") as unknown as HTMLTextAreaElement).value;
 console.log(this.note)
}

}