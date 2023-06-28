import { Component } from '@angular/core';
import { LoginService } from '../../auth/Services/login.service';
import { DoctorService } from '../Service/doctor.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmPassVaildators } from '../../auth/CustomValidator/ConfirmPassword';
import { PasswordValidator } from '../../auth/CustomValidator/PassValidator';
import { IPass } from '../../user/interface/IPass';
import { IDoctor } from '../Interface/IDoctor';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  contactInfo !:any[]
  userId!: string
  errorMsg!: string
  data: any
  ObjPass :IPass={
    DoctorId:"",
    Password:''
  }
  changedInputs: string[] = [];
  EditUser: IDoctor = {
    FullName: "",
    Email: "",
    PhoneNumber0: "",
    PhoneNumber1: "",
    PhoneNumber2: "",
    Specializtion: "",
    Location: "",

    Id: "",
    ProfileImage: ''
  }
  showConfirmation = false;
 
  constructor(private _LoginService: LoginService, private _DocService: DoctorService, private formBuilder: FormBuilder) {

  }
  ngOnInit(): void {
    this.userId = this._LoginService.getUserId()
    this.EditUser.Id= this.userId
    this.GetProfile()
  }
  UserInfo = this.formBuilder.group({
    fullName: ['', [Validators.minLength(5)]],
    email: ['', [Validators.email]],
    profileImage : ['', Validators.required],
    phoneNumber0: [[], [Validators.pattern(/^(010[0-9]{8}|011[0-9]{8}|012[0-9]{8}|015[0-9]{8})$/)]],
    phoneNumber1: [[], [Validators.pattern(/^(010[0-9]{8}|011[0-9]{8}|012[0-9]{8}|015[0-9]{8})$/)]],
    phoneNumber2: [[], [Validators.pattern(/^(010[0-9]{8}|011[0-9]{8}|012[0-9]{8}|015[0-9]{8})$/)]],
    Specializtion: [''],
    location: [''],

  });

  PassForm = this.formBuilder.group({

    newpassword: ['', [Validators.required, PasswordValidator]],
    confirmpassword: ['', [Validators.required]],

  },
    { validators: [ConfirmPassVaildators] });

  get fullName() {
    return this.UserInfo.get('fullName');
  }
  get email() {
    return this.UserInfo.get('email');
  }
  get phoneNumber0() {
    return this.UserInfo.get('phoneNumber0');
  }
  get phoneNumber1() {
    return this.UserInfo.get('phoneNumber1');
  }
  get profileImage() {
    return this.UserInfo.get('profileImage');
  }
  get phoneNumber2() {
    return this.UserInfo.get('phoneNumber2');
  }
  get Specializtion() {
    return this.UserInfo.get('Specializtion');
  } 
  get location() {
    return this.UserInfo.get('location');
  }
  get confirmpassword() {
    return this.UserInfo.get('confirmpassword');
  }
  get newpassword() {
    return this.UserInfo.get('newpassword');
  }

  GetProfile() {
    
      this._DocService.GetDoctorInfo(this.userId).subscribe((resp) => {
        this.data = resp;
        console.log(this.data);
      }, error => {
        this.errorMsg = "you dont have access"
      })
    
   this.UserInfo.controls['fullName'].setValue(this.data?.fullName);
      
   this.UserInfo.controls['email'].setValue(this.data?.email);

      
   this.UserInfo.controls['Specializtion'].setValue(this.data?.specialization);
   this.UserInfo.controls['location'].setValue(this.data?.location);
   this.UserInfo.controls['phoneNumber0'].setValue(this.data?.contactInfo[0].contactInfo);
   
   this.UserInfo.controls['phoneNumber1'].setValue(this.data?.contactInfo[1].contactInfo)
   this.UserInfo.controls['phoneNumber2'].setValue(this.data?.contactInfo[2].contactInfo)
  }
  onSubmit(UserInfo: FormGroup) { 
    if (this.UserInfo.valid) {

   
      console.log(this.UserInfo.value)

    }
  }

  onSubmitPass() {
    if (this.PassForm.valid) {
      console.log("PassForm",this.PassForm.value)

      const newPasswordControl = this.PassForm.get('newpassword');
      if (newPasswordControl && newPasswordControl.value) {
       
        this.ObjPass.Password = newPasswordControl.value;
      }

      this.ObjPass.DoctorId=this._LoginService.getUserId()
     
        this._DocService.ChangeDoctorPass(this.ObjPass).subscribe((resp)=>{
          console.log(resp);
          if(resp.message=='Success'){
            this.showConfirmation = true;
            this.PassForm.reset();
          }
          
        }, error=>{
                  console.log(error)
        })

      }
      

    }


  hideConfirmation() {
    this.showConfirmation = false;
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
     Location: new FormControl(this.EditMealWithProperties.UserDTO.Location),
     Specializtion: new FormControl(this.EditMealWithProperties.UserDTO.Specializtion),
     phoneNumber0 :new FormControl(this.EditMealWithProperties.UserDTO.PhoneNumber0),
     phoneNumber1 :new FormControl(this.EditMealWithProperties.UserDTO.PhoneNumber1),
     phoneNumber2 :new FormControl(this.EditMealWithProperties.UserDTO.PhoneNumber2),
     email :new FormControl(this.EditMealWithProperties.UserDTO.Email),
      properties: new FormControl(this.EditMealWithProperties.properties),
      

    });
   console.log(this.UpdateUSerForm)
    const formData = new FormData();
    formData.append('id', this.UpdateUSerForm.get('id')?.value);
    formData.append('phoneNumber', this.UpdateUSerForm.get('phoneNumber0')?.value);
    if( this.UpdateUSerForm.get('phoneNumber1')?.value !=""){
    formData.append('phoneNumber', this.UpdateUSerForm.get('phoneNumber1')?.value);
    }
    if( this.UpdateUSerForm.get('phoneNumber2')?.value !=""){
    formData.append('phoneNumber', this.UpdateUSerForm.get('phoneNumber2')?.value);
  }
    formData.append('fullName', this.UpdateUSerForm.get('fullName')?.value);
    formData.append('location', this.UpdateUSerForm.get('Location')?.value);
    formData.append('specializtion', this.UpdateUSerForm.get('Specializtion')?.value);
 
    formData.append('profileImage', this.UpdateUSerForm.get('profileImage')?.value);

    formData.append('email', this.UpdateUSerForm.get('email')?.value);
 
 
   formData.append('properties', this.UpdateUSerForm.get('properties')?.value);
    console.log(formData);
    
    this._DocService.EditProfile(formData).subscribe((resp)=>{
      console.log(resp)
      
      if(resp.msg=="done"){
        this.showConfirmation = true;


      }


    });
  }

}