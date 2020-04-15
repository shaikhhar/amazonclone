import { Router } from '@angular/router';
import { DataService } from './../data.service';
import { RestApiService } from './../rest-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  password1 = '';
  isSeller = false;

  btnDisabled = false;

  constructor(private router: Router, private data: DataService, private rest: RestApiService, ) { }

  ngOnInit(): void {
  }

  validate() {
    if (this.name) {
      if (this.email) {
        if (this.password) {
          if (this.password1) {
            if (this.password === this.password1) {
              return true;
            } else {
              this.data.error("Password not matched");
            }
          } else {
            this.data.error("Confirm the password");
          }
        } else {
          this.data.error("password not entered");
        }
      } else {
        this.data.error("email not entered");
      }

    } else {
      this.data.error("name not entered")
    }
  }

  async register() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        const data = await this.rest.post('http://localhost:3030/api/accounts/signup',
          {
            name: this.name,
            email: this.email,
            password: this.password,
            isSeller: this.isSeller
          });
        console.log(data);
        if (data['success']) {
          localStorage.setItem('token', data['token']);
          await this.data.getProfile();
          this.router.navigate(['profile/address'])
            .then(() => {
              console.log(data);
              this.data.success("Registration successful. Please enter shipping info below:");
            }).catch(error => {
              this.data.error(error);
            })
        } else {
          this.data.error(data['message']);
        }
      }

    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }
}
