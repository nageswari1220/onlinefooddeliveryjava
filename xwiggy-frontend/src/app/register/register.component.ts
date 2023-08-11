import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  constructor(private http: HttpClient, private router: Router) { }

  model = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phone: 0, // Assign a default value here, e.g., 0 or any other suitable value
    merchant: false // Assign a default value here, e.g., false
  };

  options: string | null = null;
  present: boolean | null = null;
  usernameAvailability = '';
  fontColor = '';

  phoneValidation = true;
  emailValidation = true;
  passwordValidation = true;

  usernamePresent(): void {
    this.fontColor = '';
    let url = 'http://localhost:8080/checkUserName';

    this.http.post<boolean>(url, this.model.username).subscribe(
      res => {
        this.present = res;
        console.log(this.present);
        if (this.present) {
          this.fontColor = 'red';
          this.usernameAvailability = 'UserName Already Taken';
        } else {
          this.fontColor = 'green';
          this.usernameAvailability = 'Available';
        }
        this.router.navigate(['register']);
      }
    )
  }

  updateSelect(): void {
    this.model.merchant = this.options != null && this.options.length != 4;
  }

  checkPhone() {
    let matcher = new RegExp('^[+ 0-9]{10}$');
    if (this.model.phone.toString().length == 10)
      this.phoneValidation = (matcher.test(this.model.phone.toString()));
  }

  checkEmail() {
    if (this.model.email.length == 0) {
      this.emailValidation = true;
    }
    if (this.model.email.length > 0 && this.model.email.indexOf('@') == -1)
      this.emailValidation = false;
    if (this.model.email.length > 0 && this.model.email.indexOf('@') != -1)
      this.emailValidation = true;
  }

  passwordStrength() {
    if (this.model.password.length == 0)
      this.passwordValidation = true;
    if (this.model.password.length < 8)
      this.passwordValidation = false;
    if (this.model.password.length >= 8) {
      let matcher = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,16})');
      this.passwordValidation = matcher.test(this.model.password);
    }
  }

  registerUser(): void {
    this.updateSelect();

    let url = 'http://localhost:8080/register';
    this.http.post<User>(url, this.model).subscribe(
      res => {
        // AppComponent.modelUser = res; // Uncomment if you want to store the response in a global variable
        this.router.navigate(['welcome']);
      },
      err => {
        console.log(this.model);
        alert('An error has occurred while Registering');
      }
    );
  }

  ngOnInit() {
  }
  
}

interface User {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  phone: number;
  merchant: boolean;
}
