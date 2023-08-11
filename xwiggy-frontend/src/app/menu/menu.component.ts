import {ApplicationModule, Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MenuServiceService} from "../menu-service.service";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  model!: menu[];
  values:Quantity[] = [];
  total!:number;

  modalCart:cart={
    quantity1:0,
    quantity2:0,
    quantity3:0
  };

  constructor(private http:HttpClient, private router:Router,private menuService:MenuServiceService) { }

  ngOnInit() {
    if (sessionStorage.getItem("userData") == null) {
      this.router.navigate(['login']);
    }
    this.getItems();
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


  getTotal(): number {
    let total = 0;
    for (let i = 0; i < this.model.length; i++) {
      total += this.model[i].price * this.values[i].quantity;
    }
    return total;
  }

  checkout() {
    const total = this.getTotal();
    sessionStorage.setItem('total', total.toString());
    this.router.navigate(['/checkout']);
  }
}



export interface menu {
  id:string;
  item:string;
  price:number;
  quantity:number;
  url:string;
  
}

export interface cart {
  quantity1:number;
  quantity2:number;
  quantity3:number;
}

export class Quantity {
  quantity!: number;
}
