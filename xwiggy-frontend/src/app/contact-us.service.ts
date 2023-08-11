import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  private apiUrl = "http://localhost:8080/getcontact" // Replace this with your actual API endpoint

  constructor(private http: HttpClient) {}

  getContactDetails(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }
}
export interface Contact {
  name: string;
  email: string;
  message: string;
  // Add more properties if needed to match the Contact object structure
}
