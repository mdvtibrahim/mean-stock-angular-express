import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [StudentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StudentRoutingModule
  ],
  exports:[StudentComponent]
})
export class StudentModule { }
