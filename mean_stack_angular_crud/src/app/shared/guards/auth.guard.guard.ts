import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthServiceService } from "src/app/auth/auth.service.service";

@Injectable({
  providedIn: 'root',
})
export class authGuardGuard implements CanActivate {
  constructor(private authServise:AuthServiceService,private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authServise.isLogged()){
      return true
    }
    if (this.router.url.includes('/login') || 
    this.router.url.includes('/register')) {
  return true;
}

this.router.navigate(['/login']); // Use absolute path
return false;
  }
};
