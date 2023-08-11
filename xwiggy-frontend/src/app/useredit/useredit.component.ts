import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit{
  modelUser: any = {}; // User data to be edited

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Fetch the user data from local storage or API and store it in modelUser
    this.getUserData();
  }

  onSave() {
    // Call the HTTP PUT request to update the user details
    this.http.put(`http://localhost:8080/update`, this.modelUser).subscribe(
      () => {
        // Handle successful update (e.g., show a success message)
        console.log('User account updated successfully.');
  
        // Update the user data in session storage after successful update
        sessionStorage.setItem('userData', JSON.stringify(this.modelUser));
  
        // Navigate back to the user welcome page after successful update
        this.router.navigate(['/welcome']);
      },
      (error) => {
        // Handle errors if the update fails
        console.error('Error updating user account:', error);
      }
    );
  }
  

  onCancel() {
    // Navigate back to the user welcome page without saving changes
    this.router.navigate(['/login']);
  }

  getUserData() {
    // Fetch the user data from local storage or API and assign it to modelUser
    // For example, if you're storing user data in session storage, retrieve it like this:
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      this.modelUser = JSON.parse(userData);
    } else {
      console.error('User data not available.');
    }
  }
}


