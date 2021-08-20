import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppUser } from '../appUser';
import { AppUserService } from '../appUser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  userName: string;
  password: string;
  invalidLogin: boolean;
  gotUser: AppUser;
  
  constructor(private router: Router, private appUserService: AppUserService){
    
  }
  ngOnInit(): void {
  }
  onLogin(user: NgForm){

    this.appUserService.getUserByUserName(user.value.userName).subscribe(
      (response: any) =>{
        if(response !=null){
          this.gotUser = response
          if (user.value.userName === this.gotUser.userName && user.value.password === this.gotUser.password) {
            if(this.gotUser.admin==true){
              sessionStorage.setItem('isadmin', "true")
              sessionStorage.setItem('username', user.value.userName)
              this.router.navigate(['home'])
            }else if(this.gotUser.admin==false){
              sessionStorage.setItem('isadmin', "false")
              sessionStorage.setItem('username', user.value.userName)
              this.router.navigate(['home'])
            }
            
          }
        }
        else{
          Swal.fire({
                title: "Something Went Wrong",
                text: "Wrong Credentials",
                icon: "warning",
                showCloseButton: true,
              })
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        Swal.fire({
          title: "Something Went Wrong",
          text: "Please fill all fields marked as *",
          icon: "warning",
          showCloseButton: true,
        })
      }    
    )



    // if(user.value.userName==="" || user.value.password===""){
    //   Swal.fire({
    //     title: "Something Went Wrong",
    //     text: "Please fill all fields",
    //     icon: "warning",
    //     showCloseButton: true,
    //   })
    // }
    // else if(user.value.userName==="admin@123" || user.value.password==="admin@123"){
    //   this.router.navigate(['home'])
    // }
    // else{
    //   Swal.fire({
    //     title: "Something Went Wrong",
    //     text: "Wrong Credentials",
    //     icon: "warning",
    //     showCloseButton: true,
    //   })
    // }
  }
}