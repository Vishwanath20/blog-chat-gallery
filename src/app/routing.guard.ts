import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    
    if(!this.auth.authenticated){
      this.router.navigate(['/signin']);
      console.log("Not Authorzed");
      return false;
    }
    console.log("YOu are Welcome");
    return true;
  }
}
