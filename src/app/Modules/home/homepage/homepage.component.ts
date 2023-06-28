import { Component, OnInit } from '@angular/core';
import { ShowDoctorsComponent } from '../show-doctors/show-doctors.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../auth/register/register.component';
import { BehaviorSubject } from 'rxjs';
import { HomeServicesService } from '../home-services.service';
import { LoginService } from '../../auth/Services/login.service';
import { IDoctor } from '../../shared/Interface/IDoctor';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  isPatient: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  testToken: any;
  roleData!: string;
  doctors: IDoctor[] = []

  constructor(public dialog: MatDialog, private homeService: HomeServicesService, private _LoginService: LoginService) { }
  ngOnInit(): void {
    this.getDoctors()

    this.testToken = JSON.stringify(localStorage.getItem('userToken'));
    this._LoginService.userData.subscribe(() => {

      if (this._LoginService.userData.getValue() != null && this._LoginService.getUserRole() == "Patient") {
        console.log(this.isPatient);
        this.isPatient.next(1);      }
      else {
        this.isPatient.next(0);
      }
    })
      // if (this._LoginService.getUserRole() == "Patient") {

      //   this.isPatient.next(1);
      // }
      // else {
      //   this.isPatient.next(0);
      // }

      this._LoginService.userData.subscribe(() => {

        console.log(this._LoginService.getUserRole())
        if (this._LoginService.getUserRole() == "Patient") {
        
          this.isPatient.next(1);
        }
        else {
          this.isPatient.next(0);
        }
      })

    
  }
  hideFixedParagraph() {

    const fixedParagraph = document.querySelector('.fixed-paragraph');
    fixedParagraph?.classList.add('hidden');

  }
  ShowDoctors() {

    this.homeService.ShowDoctors();
  }

  
  getDoctors() {
    this.homeService.getAllDoctors().subscribe({
      next: data => {
        console.log(data);
        this.doctors = data;

      },
      error: err => {
        console.log(err);
      }
    })
  }
}