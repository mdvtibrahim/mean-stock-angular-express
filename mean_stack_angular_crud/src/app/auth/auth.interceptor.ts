import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthServiceService } from "./auth.service.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService:AuthServiceService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();

        if(token){
            const cloned = req.clone({
                headers : req.headers.set('Authorization',`Bearer${token}`)
            });
            return next.handle(cloned)
        }
        else{
            return next.handle(req)
        }
    }
}
