import { Component, OnInit, NgZone  } from '@angular/core';
import { User } from '../app.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  modelMerchant: any;

  constructor(private router: Router, private http: HttpClient) { }

  /*ngOnInit() {
    // Fetch the current user details from sessionStorage or any other source
    const userDataString = sessionStorage.getItem('userData');
    if (userDataString) {
      this.modelMerchant = JSON.parse(userDataString);
    } else {
      this.router.navigate(['login']);
    }
  }
  clearLocal() {
    sessionStorage.clear();
    this.ngZone.run(() => {
      this.router.navigate(['/login']); // Navigate to the login page after logout
    });
  }

  onSave() {
    // Call the HTTP PUT request to update the user details
    this.http.put(`http://localhost:8080/update`, this.modelMerchant).subscribe(
      () => {
        // Handle successful update (e.g., show a success message)
        console.log('User account updated successfully.');

        this.ngZone.run(() => {
          // Navigate back to the merchant welcome page after successful update
          this.router.navigate(['/merchantWelcome']);
        });
      },
      (error) => {
        // Handle errors if the update fails
        console.error('Error updating user account:', error);
      }
    );
  }

  onCancel() {
    this.ngZone.run(() => {
      // Navigate back to the merchant welcome page without saving changes
      this.router.navigate(['/merchantWelcome']);
    });
  }*/
  

  ngOnInit(): void {
    // Fetch the user data from local storage or API and store it in modelUser
    this.getUserData();
  }

  onSave() {
    // Call the HTTP PUT request to update the user details
    this.http.put(`http://localhost:8080/update`, this.modelMerchant).subscribe(
      () => {
        // Handle successful update (e.g., show a success message)
        console.log('User account updated successfully.');
  
        // Update the user data in session storage after successful update
        sessionStorage.setItem('userData', JSON.stringify(this.modelMerchant));
  
        // Navigate back to the user welcome page after successful update
        this.router.navigate(['/merchantWelcome']);
      },
      (error) => {
        // Handle errors if the update fails
        console.error('Error updating user account:', error);
      }
    );
  }
  

  onCancel() {
    // Navigate back to the user welcome page without saving changes
    this.router.navigate(['/merchantWelcome']);
  }

  getUserData() {
    // Fetch the user data from local storage or API and assign it to modelUser
    // For example, if you're storing user data in session storage, retrieve it like this:
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      this.modelMerchant = JSON.parse(userData);
    } else {
      console.error('User data not available.');
    }
  }
}