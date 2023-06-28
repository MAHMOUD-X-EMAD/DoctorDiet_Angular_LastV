import { Component } from '@angular/core';
import { LoginService } from '../../auth/Services/login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IPass } from '../interface/IPass';
import { ProfileService } from '../services/profile.service';
import { PasswordValidator } from '../../auth/CustomValidator/PassValidator';
import { ConfirmPassVaildators } from '../../auth/CustomValidator/ConfirmPassword';
import { IUser } from '../interface/IUser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  plans:any
  userId!: string
  errorMsg!: string
  data: any
  ObjPass: IPass = {
    DoctorId: "",
    Password: ''
  }
   changedInputs: string[] = [];
  EditUser: IUser = {

    FullName: "",
    Diseases: "",
    ProfileImage: "",
    PhoneNumber: "",
    Email: "",
    ActivityRates: "",
    Height: 0,
    Weight: 0,
    Id: ""
  }
  showConfirmation = false;
  showDone = false;
  DoctorName =""
  constructor(private _LoginService: LoginService, private _ProfileService: ProfileService, private formBuilder: FormBuilder) {

  }
  ngOnInit(): void {
    this.userId = this._LoginService.getUserId()
    this.EditUser.Id= this.userId
    this.GetProfile();
    this.getData();
  }
  UserInfo = this.formBuilder.group({
    fullName: ['', [Validators.minLength(5),Validators.required]],
    diseases : [''],
    profileImage : ['', Validators.required],
    phoneNumber: ['', [Validators.pattern(/^(010[0-9]{8}|011[0-9]{8}|012[0-9]{8}|015[0-9]{8})$/),Validators.required]],
    email: ['', [Validators.email,Validators.required]],
    activityRates:['',Validators.required],
    height: ['',[Validators.required]],
    weight: ['',[Validators.required]],

  });

  PassForm = this.formBuilder.group({

    newpassword: ['', [Validators.required, PasswordValidator]],
    confirmpassword: ['', [Validators.required]],

  },
    { validators: [ConfirmPassVaildators] });

  get fullName() {
    return this.UserInfo.get('fullName');
  }
  get diseases() {
    return this.UserInfo.get('diseases');
  }
  get profileImage() {
    return this.UserInfo.get('profileImage');
  }
  get activityRates() {
    return this.UserInfo.get('activityRates');
  }
  get email() {
    return this.UserInfo.get('email');
  }
  get phoneNumber() {
    return this.UserInfo.get('phoneNumber');
  }
  get height() {
    return this.UserInfo.get('height');
  } get weight() {
    return this.UserInfo.get('weight');
  }
  get confirmpassword() {
    return this.UserInfo.get('confirmpassword');
  }
  get newpassword() {
    return this.UserInfo.get('newpassword');
  }

  calculateAge(birthDate: string): number {
    const currentDate: Date = new Date();
    const dateOfBirth: Date = new Date(birthDate);

    const ageDiffInMs: number = currentDate.getTime() - dateOfBirth.getTime();
    const ageDate: Date = new Date(ageDiffInMs);
    const calculatedAge: number = Math.abs(ageDate.getUTCFullYear() - 1970);

    return calculatedAge;
  }

  GetProfile() {
    if (this._LoginService.getUserRole() == 'Patient') {
      this._ProfileService.GetPatientInfo(this.userId).subscribe((resp) => {
        this.data = resp;

        console.log(this.data);
      }, error => {
        this.errorMsg = "you dont have access"
      })
    }

  }
 
  getData(){
    this.UserInfo.controls['fullName'].setValue(this.data?.fullName);
    this.UserInfo.controls['diseases'].setValue(this.data?.diseases);
    this.UserInfo.controls['profileImage'].setValue(this.data?.profileImage);
    this.UserInfo.controls['phoneNumber'].setValue(this.data?.phoneNumber);

    this.UserInfo.controls['email'].setValue(this.data?.email);
    this.UserInfo.controls['activityRates'].setValue(this.data?.activityRates);
    this.UserInfo.controls['height'].setValue(this.data?.height);
    this.UserInfo.controls['weight'].setValue(this.data?.weight);
  }
  onSubmitPass() {
    if (this.PassForm.valid) {
      console.log("PassForm", this.PassForm.value)

      const newPasswordControl = this.PassForm.get('newpassword');
      if (newPasswordControl && newPasswordControl.value) {

        this.ObjPass.Password = newPasswordControl.value;
      }

      this.ObjPass.DoctorId = this._LoginService.getUserId()
      if (this._LoginService.getUserRole() == 'Patient') {
        console.log("objPass", this.ObjPass)
        this._ProfileService.ChangePatientPass(this.ObjPass).subscribe((resp) => {
          console.log(resp);
          if (resp.message == 'Success') {
            this.showConfirmation = true;
            this.PassForm.reset();
          }

        }, error => {
          console.log(error)
        })
      }
    }
  }

  hideConfirmation() {
    this.showConfirmation = false;
  }

  GetSubscribtion() {
    this._ProfileService.getpatientSubscribtion(this._LoginService.getUserId())
      .subscribe((resp) => {
        this.plans=resp
        console.log(this.plans)
        
      }, error => {
        console.log(error)
      }
      )
  }

  onInputChange(fieldName: string, value: any) {
    // console.log("bla")
    // this.changeImg(value);
    if (!this.changedInputs.includes(fieldName)) {
      this.changedInputs.push(fieldName);
    }

  }
  changeImg(event:any){
    this.EditUser.ProfileImage = event.target.files[0]
    console.log("CI", this.EditUser.ProfileImage)
  }
  EditMealWithProperties = {
    properties: this.changedInputs,
    UserDTO: this.EditUser
  };
  UpdateUSerForm!: FormGroup;
  UpdateUSer() {
    console.log("CI",this.changedInputs)
    console.log("EU",this.EditUser)
    this.UpdateUSerForm = new FormGroup({
      id: new FormControl(this._LoginService.getUserId()),
     fullName: new FormControl(this.EditMealWithProperties.UserDTO.FullName),
     profileImage: new FormControl(this.EditUser.ProfileImage),
     phoneNumber: new FormControl(this.EditMealWithProperties.UserDTO.PhoneNumber),
    height: new FormControl(this.EditMealWithProperties.UserDTO.Height),
    weight: new FormControl(this.EditMealWithProperties.UserDTO.Weight),
    diseases: new FormControl(this.EditMealWithProperties.UserDTO.Diseases),
    activityRates :new FormControl(this.EditMealWithProperties.UserDTO.ActivityRates),
     email :new FormControl(this.EditMealWithProperties.UserDTO.Email),
      properties: new FormControl(this.EditMealWithProperties.properties),
      gender: new FormControl(this.data.gender)

    });
   console.log(this.UpdateUSerForm)
    const formData = new FormData();
    formData.append('id', this.UpdateUSerForm.get('id')?.value);
    formData.append('phoneNumber', this.UpdateUSerForm.get('phoneNumber')?.value);
    formData.append('fullName', this.UpdateUSerForm.get('fullName')?.value);
    formData.append('height', this.UpdateUSerForm.get('height')?.value);
    formData.append('weight', this.UpdateUSerForm.get('weight')?.value);
    formData.append('activityRates', this.UpdateUSerForm.get('activityRates')?.value);
    formData.append('profileImage', this.UpdateUSerForm.get('profileImage')?.value);
    formData.append('diseases', this.UpdateUSerForm.get('diseases')?.value);
    formData.append('email', this.UpdateUSerForm.get('email')?.value);
    formData.append('gender', this.UpdateUSerForm.get('gender')?.value);
 
   formData.append('properties', this.UpdateUSerForm.get('properties')?.value);
    console.log(formData);
    this._ProfileService.EditProfile(formData).subscribe((resp)=>{
      console.log(resp)
      
      if(resp.msg=="done"){
        this.showDone = true;


      }


    });
  }
}