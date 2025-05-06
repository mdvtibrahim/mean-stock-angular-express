import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup
  isSuccess:boolean = false
  isErr: boolean =false;
constructor(private formBuilder : FormBuilder,private authService:AuthServiceService,
  private router:Router
){}
  ngOnInit(): void {
this.loginForm = this.formBuilder.group({
  username:['',[Validators.required,Validators.minLength(6)]],
  password:['',[Validators.required,Validators.minLength(4)]]
})
  }
  loginSubmit(){
    let obj = {
      'username':this.loginForm.value.username,
      'password':this.loginForm.value.password
    }
    this.authService.login(obj).subscribe(res=>{
      console.log(res);
      if(res.token){
        setTimeout(() => {
        this.isErr= false;
         this.isSuccess= true;
         console.log('token',res.token);
         localStorage.setItem('token',res.token)
           this.router.navigate(['/students'])
        }, 1000);
      }else{
        this.isSuccess= false;
        this.isErr= true;
      }
    },
    (error) => {
      console.error('Login failed', error); 
      this.isErr = true;  
    })
  }
}
