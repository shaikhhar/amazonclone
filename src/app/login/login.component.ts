import { RestApiService } from './../rest-api.service';
import { DataService } from './../data.service';
import { Router, Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: '';
  password: '';
  btnDisabled= false;

  constructor(private router: Router, private data: DataService, private rest: RestApiService) { }

  ngOnInit(): void {
  }

  validate(){
    if(this.email){
      if(this.password){
        return true;
      }else{
        this.data.error("password not entered")
      }
    }else{
      this.data.error("email not entered")
    }
  }

  login(){
    this.btnDisabled=true;
    if(this.validate()){
        this.rest.post('http://localhost:3030/api/accounts/login', {email: this.email, password: this.password})
        .then(result=>{
          if(result['success']){
            localStorage.setItem('token', result['token']);
            this.data.getProfile();
            this.router.navigate(['/']);
          }else{
            this.data.error(result['message']);
          }
        })
        .catch(err=>{
          this.data.error(err['message']);
        });
    }
    this.btnDisabled=false;
  }

}
