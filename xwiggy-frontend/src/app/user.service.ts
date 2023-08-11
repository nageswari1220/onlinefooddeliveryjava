import { Injectable } from '@angular/core';
import { User } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {}
   
  private userData: User | undefined ;

  setUser(user: User): void {
    this.userData = user;
  }

  getUser(): User | undefined {
    return this.userData;
  }
}
