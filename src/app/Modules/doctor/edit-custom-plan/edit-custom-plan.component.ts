import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DoctorService } from '../Service/doctor.service';
import bsCustomFileInput from 'bs-custom-file-input';
import { IMeal } from '../Interface/IMeal';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomPlanService } from '../Service/custom-plan.service';

@Component({
  selector: 'app-edit-custom-plan',
  templateUrl: './edit-custom-plan.component.html',
  styleUrls: ['./edit-custom-plan.component.scss']
})
export class EditCustomPlanComponent {
  id !: any
  data !: any
  Dayid !:any
  constructor(private _customService: CustomPlanService ,private _doctorService: DoctorService , private _ActivatedRoute: ActivatedRoute ,private router: Router) { }
  ngOnInit(): void {
    bsCustomFileInput.init();
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.Dayid = params.get('Dayid');
      this.EditMeal.Id = this.id;
      this._customService.GetCustomMeal(this.id).subscribe(Response => {
        this.data = Response;
        console.log("SingleCusMeallll", this.data)
      });
    });

  }

  changedInputs: string[] = [];

  EditMeal: IMeal = {
    Id: 1,
    Description: "",
    image: ""
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
    this._doctorService.EditCustomMeal(formData).subscribe(()=>{
      this.router.navigate([`/doctor/dash/CustomPlanDayMeal/${this.Dayid}`]);

    });
  }
}
