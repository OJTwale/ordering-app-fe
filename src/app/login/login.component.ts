import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
    userName: String;
    password: String;
  
  constructor(private router: Router){
    
  }
  ngOnInit(): void {
  }
  onLogin(user: NgForm){
    if(user.value.userName==="" || user.value.password===""){
      Swal.fire({
        title: "Something Went Wrong",
        text: "Please fill all fields",
        icon: "warning",
        showCloseButton: true,
      })
    }
    else if(user.value.userName==="admin@123" || user.value.password==="admin@123"){
      this.router.navigate(['home'])
    }
    else{
      Swal.fire({
        title: "Something Went Wrong",
        text: "Wrong Credentials",
        icon: "warning",
        showCloseButton: true,
      })
    }
  }
}