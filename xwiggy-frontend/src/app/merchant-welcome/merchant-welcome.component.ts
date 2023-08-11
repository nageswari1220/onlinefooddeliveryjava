import { Component, OnInit } from '@angular/core';
import {User} from "../app.component";
import {Router} from "@angular/router";
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-merchant-welcome',
  templateUrl: './merchant-welcome.component.html',
  styleUrls: ['./merchant-welcome.component.css']
})
export class MerchantWelcomeComponent implements OnInit{
  feedback: string = '';
  showFeedbackModal: boolean = false;
  modelMerchant: User = {
    username:'',
    password:'',
    email:'',
    phone:0,
    firstname:'',
    lastname:'',
    address:'',
    merchant:false
  };
  userService: any;
 

  constructor(private router:Router, private http: HttpClient,) { }

  ngOnInit() {
    const userDataString = sessionStorage.getItem('userData');
    if (!userDataString) {
      this.router.navigate(['login']);
    } else {
      let userData = JSON.parse(userDataString);
      console.log(userData);
      Object.assign(this.modelMerchant, userData);
    }
  }

  clearLocal(){
    sessionStorage.clear();
   
  }

 
  
  /*deleteUser(): void {
    if (!this.modelMerchant || !this.modelMerchant.username) {
      console.error('User data not available.');
      return;
    }

    const username = this.modelMerchant.username;
    this.http.delete(`http://localhost:8080/delete/${username}`).subscribe(
      () => {
        // Handle successful deletion (e.g., show a success message, redirect to another page)
        console.log('User account deleted successfully.');
        this.clearLocal();
        sessionStorage.clear();
        this.router.navigate(['/login']); // Redirect to the home page after successful deletion
      },
      (error) => {
        // Handle errors if the deletion fails
        console.error('Error deleting user account:', error);
      }
    );
  }*/


  deleteA(): void {
    if (!this.modelMerchant || !this.modelMerchant.username) {
      console.error('User data not available.');
      return;
    }

    const username = this.modelMerchant.username;
    this.http.delete(`http://localhost:8080/delete/${username}`).subscribe(
      () => {
        // Handle successful deletion (e.g., show a success message)
        console.log('User account deleted successfully.');
        // Clear the user data and navigate to the login page after successful deletion
        
        this.router.navigate(['login']);
      },
      (error) => {
        // Handle errors if the deletion fails
        console.error('Error deleting user account:', error);
        this.router.navigate(['login']);
      }
    );
  }
  editUser(): void {
    // Navigate to the edit-profile page for editing user details
    this.router.navigate(['edit-profile']);
  }

  
}
