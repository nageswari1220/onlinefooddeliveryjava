import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import {cart, menu, Quantity} from "../menu/menu.component";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MenuServiceService} from "../menu-service.service";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-merchant-menu',
  templateUrl: './merchant-menu.component.html',
  styleUrls: ['./merchant-menu.component.css']
})
export class MerchantMenuComponent implements OnInit{


  model: menu[] = [];

  modalCart:cart={
    quantity1:0,
    quantity2:0,
    quantity3:0
  };

  values:Quantity[] = [];
  domSanitizer: any;
  totalCalculated: boolean = false;
  formValid: boolean = false;

  constructor(private http:HttpClient, private router:Router,private menuService:MenuServiceService,
              public _DomSanitizationService: DomSanitizer, private changeDetectorRef: ChangeDetectorRef ) { }

  ngOnInit() {
    if (sessionStorage.getItem("userData") == null) {
      this.router.navigate(['login']);
    }
    this.getItems();
    const updatedQuantities = localStorage.getItem('updatedQuantities');
    if (updatedQuantities) {
      this.model = JSON.parse(updatedQuantities);
    }
  }

  clearLocal(){
    sessionStorage.clear();
  }

  getItems():void{
    this.menuService.getItems().subscribe((men: any[]) => {
      this.model = men;
      for (let i=0;i<this.model.length;i++){
        this.values.push(new Quantity());
        this.values[i].quantity=0;
      }
    });
  }
  getTotal(): void {
    let total = 0;
    for (let i = 0; i < this.model.length; i++) {
      total += this.model[i].price * this.values[i].quantity;
    }
    this.totalCalculated = true;
    // Store the result in a variable to track form validity
    this.formValid = total > 0;
  }

  tSanitizedUrl(url: string): SafeUrl {
    return this._DomSanitizationService.bypassSecurityTrustUrl(url);
  }
  updateAllQuantities(): void {
    const updateRequests = [];

    for (let i = 0; i < this.model.length; i++) {
      const updatedQuantity = this.model[i].quantity + this.values[i].quantity;
      this.model[i].quantity = updatedQuantity;

      updateRequests.push({
        productId: this.model[i].id,
        newQuantity: updatedQuantity
      });

      this.values[i].quantity = 0;
    }

    this.updateQuantitiesInBackend(updateRequests).subscribe(
      () => {
        console.log('Quantities updated successfully');
        this.storeUpdatedQuantitiesLocally(); // Store quantities in localStorage
      },
      (error) => {
        console.error('Error updating quantities:', error);
      }
    );
  }

  storeUpdatedQuantitiesLocally(): void {
    // Store the updated quantities in localStorage
    localStorage.setItem('updatedQuantities', JSON.stringify(this.model));
  }
  
  updateQuantitiesInBackend(updateRequests: any[]): Observable<any> {
    return this.http.put(`http://localhost:8080/menuupdate`, updateRequests);
  }
}  