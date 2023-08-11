import { Component,OnInit } from '@angular/core';
import {HttpClient, HttpEventType} from "@angular/common/http";
import {Router} from "@angular/router";


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  newFoodItems:foodItems={
    id:'',
    name:'',
    price:0,
    quantityAvailable:0,
    fileDataF:null
  };

  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit() {
    if(sessionStorage.length==0)
      this.router.navigate(['welcome']);
  }

  url: string | null = null;
  onSubmit():void{
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('newFoodItem',JSON.stringify(this.newFoodItems));
    console.log(formData.get('file'));
    console.log(formData.get('newFoodItem'));

    if(formData.get('file')==null || formData.get('file')==undefined)
    {
      console.log(formData.get('file'));
      this.url="http://localhost:8080/addNewItem";
    }
    else
    {
      this.url="http://localhost:8080/addNewItemUrl";
    }
    this.http.post(this.url, formData)
      .subscribe(
        res=>
        {
          console.log(this.newFoodItems);
          alert("Item Added Successfully!");
        },err=>{
          alert("Failed to add item. Please Try after sometime!");
        }
      )
  }

  selectedFile:any=null;

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files) {
      const selectedFiles: FileList = inputElement.files;
      // Handle the selected files here
    }
  }
  
  present: boolean | null = null;
  checkAvailability() {
    this.http.post<boolean>("http://localhost:8080/checkItemId",this.newFoodItems.id).subscribe(
      res=>{
        this.present=res;
      },err=>{
        alert("Error. Try After Sometime");
        this.present = null;
      }
    )
  }

  clearLocal(){
    sessionStorage.clear();
  }
}

export interface foodItems {
  id: string;
  name:string;
  price:number;
  quantityAvailable:number;
  fileDataF:string|null;
}
