import { Component, OnInit, Input } from '@angular/core';
import { User } from '../app.component';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { UserService } from '../user.service'; // Import the AuthService


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
 
  modelUser: User = {
    username: '',
    password: '',
    email: '',
    phone: 0,
    firstname: '',
    lastname: '',
    address: '',
    merchant: false
  };
 

  constructor(private router: Router, private http: HttpClient, private authService: UserService) { }

  ngOnInit() {
    const userDataString = sessionStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      console.log(userData);
      Object.assign(this.modelUser, userData);
    } else {
      this.router.navigate(['login']);
    }
  }

  clearLocal() {
    sessionStorage.clear();
  }
  
  deleteUser(): void {
    if (!this.modelUser || !this.modelUser.username) {
      console.error('User data not available.');
      return;
    }

    const username = this.modelUser.username;
    this.http.delete(`http://localhost:8080/delete/${username}`).subscribe(
      () => {
        // Handle successful deletion (e.g., show a success message, redirect to another page)
        console.log('User account deleted successfully.');
        this.logout();
        this.router.navigateByUrl('/register'); // Redirect to the home page after successful deletion
      },
      (error) => {
        // Handle errors if the deletion fails
        console.error('Error deleting user account:', error);
        console.log(error.status); // Add this line
        console.log(error.message); // Add this line
      }
    );
  }
  logout(): void {
    console.log('User data cleared.');
    sessionStorage.removeItem('userData');
  }
 
}
