import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { PlanComponent } from './plan/plan.component';
import { UserRoutingModule } from './User-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotesComponent } from './notes/notes.component';


@NgModule({
  declarations: [
    ProfileComponent,
    PlanComponent,
    NotesComponent
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserModule { }
