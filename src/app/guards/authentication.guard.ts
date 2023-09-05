import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export function authenticationGuard(): CanActivateFn {
  return ()=>{
    const authService:AuthenticationService=inject(AuthenticationService);
    const router:Router=inject(Router);
    if(authService.authenticatedUser){
      return true;

    }
    else{
      router.navigateByUrl("/login");
      return false;
    }
  }
};
