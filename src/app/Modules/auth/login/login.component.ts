import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidator } from '../CustomValidator/PassValidator';
import { LoginService } from '../Services/login.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private _router: Router, private _LoginService: LoginService) { }

  invaliduser: string = '';
  userRole: string = '';
  LoginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(5)]],

    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10), PasswordValidator]],

  });
  get UserName() {
    return this.LoginForm.get('username');
  }

  get password() {
    return this.LoginForm.get('password');
  }
  ngOnInit(): void {

  }

  onSubmit(LoginForm: FormGroup) {
    if (this.LoginForm.valid) {
     

      this._LoginService.Login(this.LoginForm.value).subscribe((resp) => {
        if (resp.messege == 'Success') {
          localStorage.setItem('userToken', resp.token);
          this._LoginService.saveUserData();
          this.userRole=this._LoginService.getUserRole();
          if( this.userRole=='Patient'){
                  this._router.navigate(['home'])
          }
          else if(this.userRole=='Doctor'){
            this._router.navigate(['doctor/dash/Welcome'])
          }
          else{
            this._router.navigate(['home'])
          }

        }

      }, error => {
        this.invaliduser = " اسم المستخدم او كلمه سر غير صحيحه";
      }
      )
      

    } else {
      console.log('Not Valid.');

    }
  }
 show() {
    var x = document.getElementById("password")as HTMLInputElement;
    $("#eye").toggleClass('fa-eye fa-eye-slash');
   if (x.type == "password") {
      x.type = "text";
    } else {
      x.type = "password";
      console.log("pass")
    }
  }

  

}


