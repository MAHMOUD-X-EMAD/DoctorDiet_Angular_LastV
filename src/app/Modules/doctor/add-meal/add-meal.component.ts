import { Component, OnInit } from '@angular/core';
import 'bs-custom-file-input';
import bsCustomFileInput from 'bs-custom-file-input';


import { DoctorService } from '../Service/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IMeal } from '../Interface/IMeal';
import { FormControl, FormGroup } from '@angular/forms';
// declare const bsCustomFileInput: any;
@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss']
})
export class AddMealComponent implements OnInit {
  id !: any
  data !: any
  Dayid !:any

  changedInputs: string[] = [];

  EditMeal: IMeal = {
    Description: "",
    image: "",
    Id: 0
  }

  constructor(private _DoctorService: DoctorService, private _ActivatedRoute: ActivatedRoute ,private router: Router) { }
  ngOnInit(): void {
    bsCustomFileInput.init();

    this._ActivatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.Dayid = params.get('Dayid');

      this.EditMeal.Id = this.id;
      this._DoctorService.GetMealById(this.id).subscribe(Response => {
        this.data = Response;
        console.log("SingleMeal", this.data)
      });
    });

  }
  onInputChange(fieldName: string, value: any) {
    if (!this.changedInputs.includes(fieldName)) {
      this.changedInputs.push(fieldName);
    }
  }
  previewImage(event: any) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const preview = document.getElementById('preview');
        if (preview) {
          preview.setAttribute('src', e.target.result);
          preview.style.display = 'block';
        }
      };
      reader.readAsDataURL(input.files[0]);
      this.EditMeal.image = event.target.files[0]

    }
  }
  EditMealWithProperties = {
    properties: this.changedInputs,
    mealCustomPlanDTO: this.EditMeal
  };
  editMealForm!: FormGroup;
  UpdateMeal() {
    this.editMealForm = new FormGroup({
      Id: new FormControl(this.EditMealWithProperties.mealCustomPlanDTO.Id),
      Description: new FormControl(this.EditMealWithProperties.mealCustomPlanDTO.Description),
      Image: new FormControl(this.EditMealWithProperties.mealCustomPlanDTO.image),
      properties: new FormControl(this.EditMealWithProperties.properties),
    });

    const formData = new FormData();
    formData.append('Id', this.editMealForm.get('Id')?.value);
    formData.append('Description', this.editMealForm.get('Description')?.value);
    formData.append('Image', this.editMealForm.get('Image')?.value);

    formData.append('properties', this.editMealForm.get('properties')?.value);
    console.log(this.changedInputs);
    this._DoctorService.EditMeal(formData).subscribe(()=>{
      this.router.navigate([`/doctor/dash/TodayMeal/${this.Dayid}`]);
    });
  }

}
