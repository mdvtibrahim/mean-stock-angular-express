import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
private apiLoginUrl = environment.apiUrl 
  constructor(private http : HttpClient, private router:Router) {
    // let token = localStorage.getItem('token')
    // console.log('authtoken',token);
    // if (!token && !this.router.url.includes('/login')) {
    //   this.router.navigate(['/login']); // Force redirect if no token
    // }
   }

  register(data: { username: any; password: any; }){
    debugger
    const jsonData = JSON.stringify(data)
    console.log('regS',data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
   };
    return this.http.post(`${this.apiLoginUrl}/register`, 
      jsonData,httpOptions) 
  }
  login(data:{username:string,password:string}){
    const json  = JSON.stringify(data)
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
   };
    return this.http.post<{message:string,token:string}>(`${this.apiLoginUrl}/login`,
      json, httpOptions)
  }

  // logout(){
  //   localStorage.removeItem('token')
  //   this.router.navigate(['/login'])
  // }

  isLogged(){
   const token = localStorage.getItem('token')// Or sessionStorage, depending on your choice
    return token ? true : false; 
  }

  getToken(): string | null{
    return localStorage.getItem('token')
  }


}
