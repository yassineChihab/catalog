import { Injectable } from '@angular/core';
import { AppUser } from '../Model/User.model';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  users:AppUser[]=[];
  authenticatedUser?:AppUser;
  constructor() { 

    this.users.push({userId:UUID.UUID(),username:"user1",password:"1234",roles:["USER"]});
    this.users.push({userId:UUID.UUID(),username:"user2",password:"1234",roles:["USER"]});

    this.users.push({userId:UUID.UUID(),username:"admin",password:"1234",roles:["USER","ADMIN"]});

  }

  public login(username:string,password:string):Observable<AppUser>{
    let appUser=this.users.find(u=>u.username==username);
    if(!appUser)
    {
      return throwError(()=>new Error("user not found"));
      
    }
    if(appUser.password!=password)
    {
      return throwError(()=>new Error("bad credentials"));
    }
    return of(appUser);
  }

  public authenticateUser(appuser:AppUser):Observable<boolean>{
    this.authenticatedUser=appuser;
    localStorage.setItem('authUser',JSON.stringify({username:appuser.username,roles:appuser.roles,jwt:"JWT-Token"}));
    return of(true);
  
  }
  public hasRole(role:string):boolean  {
   return  this.authenticatedUser!.roles.includes(role);

  }

  public isAuthenticated(){
    return this.authenticateUser!=undefined;
  }


  public logout():Observable<boolean>
  {
    this.authenticatedUser=undefined;
    localStorage.removeItem("authUser");
    return of(true);
  }
}
