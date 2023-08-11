import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../app.component';
import { Router } from '@angular/router';
import { Contact, ContactUsService } from '../contact-us.service';

@Component({
  selector: 'app-feedback-details',
  templateUrl: './feedback-details.component.html',
  styleUrls: ['./feedback-details.component.css']
})
export class FeedbackDetailsComponent implements OnInit{
  contactDetails: Contact[] = [];

  constructor(private contactUsService: ContactUsService) {}
  ngOnInit() {
    this.getContactDetails();
  }

  getContactDetails() {
    this.contactUsService.getContactDetails()
      .subscribe(
        (data) => {
          this.contactDetails = data;
        },
        (error) => {
          console.error('Error fetching contact details:', error);
        }
      );
  }

  sendFeedback() {
    // Implement your feedback sending logic here
    console.log('Feedback sent!');
  }
}