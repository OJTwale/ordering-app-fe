import { Injectable } from '@angular/core';
import { AppUser } from '../appUser';
import { AppUserService } from '../appUser.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  gotUser: AppUser;
  isUser: boolean;
  constructor(private appUserService: AppUserService) { }

  authenticate(username: string, password: string) {
    this.appUserService.getUserByUserName(username).subscribe(
      (response: any) =>{
        this.gotUser= response;
        if (username === this.gotUser.userName && password === this.gotUser.password) {
          sessionStorage.setItem('username', username)
          return this.isUser=true;
        } else {
          return this.isUser=false;
        }
      }
    )
    
    return this.isUser
    // if (username === this.gotUser.userName && password === this.gotUser.password) {
    //   console.log(this.gotUser);
      
    //   sessionStorage.setItem('username', username)
    //   return true;
    // } else {
    //   return false;
    // }
  }

  isUserAdmin() {
    let user = sessionStorage.getItem('isadmin')
    console.log(user);
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}