import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
  
    if(localStorage.getItem('token')){
      if(state.url.startsWith('/profile')){
        return true; //means only allow navigation if token and if /profile
      }
      this.router.navigate(['/']);
      return false; //means navigation to signup or login is cancelled if token found , instead redirected to ['/]
    }else{
      if(state.url.startsWith('/profile')){
        return false; //means reject navigation to profile if no token
      }
      return true; //means navigation can continue to signup or login ie where can Activate is implemented in approuting module
    }
  }
}
