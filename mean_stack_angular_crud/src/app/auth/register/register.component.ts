import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup
isSuccess: boolean=false;
constructor(private formBuilder : FormBuilder,private authService:AuthServiceService,
  private router:Router
){
}
  ngOnInit(): void {
this.registerForm = this.formBuilder.group({
  username:['',[Validators.required,Validators.minLength(6)]],
  password:['',[Validators.required,Validators.minLength(4)]]
})
  }
  submitReg(){
    debugger
    let obj = {
      "username":this.registerForm.value.username,
      "password":this.registerForm.value.password
    }
    this.authService.register(obj).subscribe(res=>{
    if(res){
      this.isSuccess = true
      setTimeout(() => {
        this.router.navigate(['/login'])
      }, 1000);
    }
    })
  }
}
