import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../Model/Product';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products!:Array<Product>;
  constructor() {
    this.products=[
      {id:UUID.UUID(),name:"Computer",price:6500,promotion:true},
      {id:UUID.UUID(),name:"Printer",price:6000,promotion:false},
      {id:UUID.UUID(),name:"Smartphone",price:1400,promotion:false},

    
    ];
    for(let i=0;i<10;i++){
        this.products.push( {id:UUID.UUID(),name:"Computer",price:6500,promotion:true});
        this.products.push( {id:UUID.UUID(),name:"Computer",price:4500,promotion:true});
        this.products.push( {id:UUID.UUID(),name:"Computer",price:7500,promotion:true});
    }
    for(let i=0;i<10;i++){
      this.products.push( {id:UUID.UUID(),name:"Printer",price:6500,promotion:true});
      this.products.push( {id:UUID.UUID(),name:"Printer",price:4500,promotion:true});
      this.products.push( {id:UUID.UUID(),name:"Printer",price:7500,promotion:true});
  }
  for(let i=0;i<10;i++){
    this.products.push( {id:UUID.UUID(),name:"Smartphone",price:6500,promotion:true});
    this.products.push( {id:UUID.UUID(),name:"Smartphone",price:4500,promotion:true});
    this.products.push( {id:UUID.UUID(),name:"Smartphone",price:7500,promotion:true});
}
   }


   public getAllProducts():Observable<Array<Product>>
   {
    let rnd=Math.random();
    if(rnd<0.1){
      return throwError(()=>new Error("Internet connection error"))
    }
    else{
      return of(this.products);
    }
  
   }

   public deleteProduct(id:string):Observable<boolean>{
    debugger;
   this.products= this.products.filter(p=>p.id!=id);
    return of(true);
   }


   public setPromotion(id:string):Observable<boolean>{
    let product=this.products.find(p=>p.id==id);
    if(product!=undefined)
    {
      product.promotion=!product.promotion;
      return of(true);
    }else return throwError(()=>new Error("Product Not Found"));
   
   }
   public SearchProduct(keyword:string):Observable<Product[]>
   {
          let products= this.products.filter(p=>p.name.includes(keyword));
          return of(products);
   }

   public AddNewProduct(p:Product):Observable<Product>
   {
      p.id=UUID.UUID();
      this.products.push(p);
      return of(p);
   }

   public getProduct(id:string):Observable<Product | undefined>{
      return of(this.products.find(p=>p.id==id));
   }



   public updateProduct(product:Product):Observable<Product>{
    this.products=this.products.map(p=>(p.id==product.id)?product:p);
    return of(product);
   }

}
