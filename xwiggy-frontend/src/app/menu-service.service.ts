import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Quantity, menu } from './menu/menu.component';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {

  private menuItems: menu[] = [];
  private quantities: number[] = [];

  // BehaviorSubject to track menu item quantities
  private quantitiesSubject = new BehaviorSubject<number[]>([]);
 

  constructor(public HttpClient: HttpClient) { }

  public getItems():any{
    let url = "http://localhost:8080/menu";
    return this.HttpClient.get(url);
  }
 
  /*updateQuantity(productId: string, newQuantity: number): Observable<any> {
    const requestBody = { newQuantity: newQuantity };
    return this.HttpClient.put(`/http://localhost:8080/menu/${productId}`, requestBody);
  }*/
  updateQuantity(productId: string, newQuantity: number): Observable<any> {
    const requestBody = { newQuantity: newQuantity };
    return this.HttpClient.put(`http://localhost:8080/menu/${productId}`, requestBody);
  }

}
