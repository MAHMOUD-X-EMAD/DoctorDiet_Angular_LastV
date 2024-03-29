import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmPassVaildators, ConfirmPassVali } from '../CustomValidator/ConfirmPassword';
import { PasswordValidator } from '../CustomValidator/PassValidator';
import { RegisterService } from '../Services/register.service';
import {PatientRegister} from'../Interfaces/PatientRegisterInterfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  selectedFile!: File;
  constructor(private formBuilder: FormBuilder,
    private _route: Router, private _registerService: RegisterService) {

  }
  PatientInterfaceData!:PatientRegister
   
  error: string = '';

  RegistrationForm = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.minLength(5)]],
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^(010[0-9]{8}|011[0-9]{8}|012[0-9]{8}|015[0-9]{8})$/)]],
    age: ['', [Validators.required, Validators.min(15)]],
    height: ['', [Validators.required]],
    weight: ['', [Validators.required]],
    chronicDisease: [''],
    ProfileImage:['',[Validators.required]],


    Goal: this.formBuilder.group(
      {
        weightLoss: [false,],
        weightGain: [false,],
        muscleBuilding: [false,]
      }
    ),

    NoEat: this.formBuilder.group(
      {
        Fish: [false,],
        Meat: [false,],
        Chekin: [false,],
        NoThing: [false,],
      }
    ),

    activityRate: this.formBuilder.group(
      {
        low: [false,],
        regular: [false,],
        high: [false,],
        veryHigh: [false,]
      }
    ),


    Gender: ['', [Validators.required]],
    KindOfFoodDidnotNeed: ['',],
    password: ['', [Validators.required, PasswordValidator]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: [ConfirmPassVaildators] });

  get OptionRun() {
    return this.RegistrationForm.get('optionsRun');
  }
  get OptionWalk() {
    return this.RegistrationForm.get('optionsWalk');
  }
  get OptionSleep() {
    return this.RegistrationForm.get('optionsSleep');
  }
  get UserName() {
    return this.RegistrationForm.get('userName');
  }
  get fullName() {
    return this.RegistrationForm.get('fullName');
  }
  get email() {
    return this.RegistrationForm.get('email');
  }
  get phoneNumber() {
    return this.RegistrationForm.get('phoneNumber');
  }
  get password() {
    return this.RegistrationForm.get('password');
  }
  get confirmPassword() {
    return this.RegistrationForm.get('confirmPassword');
  }
  get age() {
    return this.RegistrationForm.get('age');
  }
  get height() {
    return this.RegistrationForm.get('height');
  }
  get weight() {
    return this.RegistrationForm.get('weight');
  }
  get Gender() {
    return this.RegistrationForm.get('Gender');
  }
  get ProfileImage() {
    return this.RegistrationForm.get('ProfileImage')
  }

  onSubmit(RegistrationForm: any) {
      console.log(RegistrationForm.value)
     
      if (this.RegistrationForm.valid) {
      console.log('Form submitted!');
      console.log('Selected options:', this.RegistrationForm.value);
      const formData =new FormData();
      formData.append('FullName', RegistrationForm.get("fullName").value);
      formData.append('UserName', RegistrationForm.get("userName").value);
      formData.append('Diseases', RegistrationForm.get("chronicDisease").value);
      formData.append('Gender', RegistrationForm.get("Gender").value);
      formData.append('Weight', RegistrationForm.get("weight").value);
      formData.append('BirthDate', RegistrationForm.get("age").value);
      formData.append('Height', RegistrationForm.get("height").value);
      formData.append('Email', RegistrationForm.get("email").value);
      formData.append('Password', RegistrationForm.get("password").value);
      formData.append('phoneNumber', RegistrationForm.get("phoneNumber").value);
      formData.append('ConfirmPassword', RegistrationForm.get("confirmPassword").value);
      formData.append('ProfileImage', this.selectedFile,this.selectedFile.name);

      const goalGroup = RegistrationForm.get('Goal') as FormGroup;
      for (const controlName in goalGroup.controls) {
        if (goalGroup.controls[controlName].value) {
          console.log(controlName)
          formData.append('Goal', controlName);
        }
      }
      
      // Append selected values from NoEat group
      const noEatGroup = RegistrationForm.get('NoEat') as FormGroup;
      for (const controlName in noEatGroup.controls) {
        if (noEatGroup.controls[controlName].value) {
          console.log(controlName)
          formData.append('noEats', controlName);
        }
      }
      
      // Append selected values from activityRate group
      const activityRateGroup = RegistrationForm.get('activityRate') as FormGroup;
      for (const controlName in activityRateGroup.controls) {
        if (activityRateGroup.controls[controlName].value) {
          console.log(controlName)
          formData.append('ActivityRates', controlName);
        }
      }
      
      console.log('formData : ',formData);

      this._registerService.PatientRegitser(formData).subscribe(
        (response) => {
          console.log(response)
          if (response.message == 'Success') {
            console.log("Recored Added")
            this._route.navigate(['/auth/Login']);

          }
          else {
            this.error = response.errors.email.message;
          }

        }

      )


         } else {
      alert('بيناتك غير صحيحه !')
      console.log('Please check at least one option.');
      console.log('Selected options:', this.RegistrationForm.value)
    }
  }



  onSelectFile(fileInput: any) {
    this.selectedFile = <File>fileInput.target.files[0];
    console.log(this.selectedFile)
    const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer();
    dataTransfer.items.add(new File(['my-file'], 'new-file-name'));
    const inputElement: HTMLInputElement = document.getElementById('formFile') as HTMLInputElement

     inputElement.files = dataTransfer.files;
  }

}
