import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AppUser } from '../appUser';
import { AppUserService } from '../appUser.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  user:AppUser;
  uvalidated:boolean=false;
  flag:boolean=false;

  constructor(private appUserService:AppUserService) { }

  ngOnInit(): void {
  }

  public validateUser(){
    if(this.user===null){
      return false
    }
    else{
      this.uvalidated=true;
      return true
      
    }
  }

  public checkAnswers(answer:NgForm){
    if(this.user.answer1===answer.value.ans1 && this.user.answer2===answer.value.ans2){
      Swal.fire({
        title: "Success",
        text: "Your password is: "+ this.user.password,
        icon: "success",
        showCloseButton: true,
      })
      this.flag=true;
    }
    else{
      Swal.fire({
        title: "Warning",
        text: "You have entered wrong answers",
        icon: "error",
        showCloseButton: true,
      })
    }
    
  }

  public getUserPassword(username:string){
    this.appUserService.getUserByUserName(username).subscribe(
      (response: AppUser) => {
        if(response===null){
          alert("User Not Found")
        }
        else{
          this.user=response;
        }
      },
      (error:HttpErrorResponse)=>{
        alert("user not found")
      }
    )
    }

}
