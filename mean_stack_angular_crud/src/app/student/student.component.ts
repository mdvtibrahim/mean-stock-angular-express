import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from './student.service';
import { Student, StudentCreate } from '../shared/models/student.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  studentForm!:FormGroup
  studentList: Student[]=[];
  current_id:any;
  isUpdated: boolean=false;
constructor(private formBuilder: FormBuilder, private studentService:StudentService,
  private router:Router){}
  ngOnInit(): void {
   this.studentForm = this.formBuilder.group({
    name:[''],
    age:[''],
    total:['']
   })
   this.getStud()
  }
  onSubmint(){
    const student ={
      // _id : '',
      name: this.studentForm.value.name,
      age: this.studentForm.value.age,
      total: this.studentForm.value.total,
    }
    if(this.isUpdated){
      this.studentService.updateStudent(this.current_id, student).subscribe(res=>{
        this.getStud()
        this.isUpdated =false
        this.studentForm.reset()
      })

    }else{
      this.studentService.createStudent(student).subscribe((res)=>{
     this.getStud()
     this.studentForm.reset()
      })
    }
  }
  getStud(){
    this.studentService.getStudent().subscribe(res=>{
      this.studentList = res.data
      console.log('get',this.studentList);
    })
  }
  deletedId(list: Student, event: MouseEvent) {
    event.stopPropagation(); 
      this.studentService.deleteStudent(list._id).subscribe(res=>{
        this.getStud()
        this.isUpdated =true
        this.studentForm.reset()
      })
    }
    goToEdit(list:Student){
      this.current_id = list._id
      console.log(this.current_id);
      this.isUpdated =true
      this.studentForm.setValue({
        name:list.name,
        age:list.age,
        total:list.total
      })
    }
    logout(){
      this.router.navigate(['/auth/login'])
      localStorage.removeItem('token')
    }
}
