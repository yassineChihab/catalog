import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../Model/Product';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  implements OnInit{

  products!:Array<Product> ;
  errorMessage!:string;
  searchFormGroup!:FormGroup;




  constructor(private productService:ProductService,private fb:FormBuilder,public authService:AuthenticationService,private router:Router){}
  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      Keyword: this.fb.control(null)
    })


   this.HandleGetAllProduct();

  }
  HandleGetAllProduct()
  {
    this.productService.getAllProducts().subscribe(
      {
        next:(response) =>{
          this.products=response
        },
        error :(err)=>{
          this.errorMessage=err
        }
      }
    );
  }
  HandleDeleteProduct(p:Product)
  {
    let conf=confirm("Are you sere ?")
    if(conf==false)
    {
      return;
    }
    else{
      this.productService.deleteProduct(p.id).subscribe({
        next:(data)=>{
          let indes=this.products.indexOf(p);
          this.products.splice(indes,1);
        }
      })
    }
   
  }
  HandleSetPromotion(p:Product){
    let promo=p.promotion
    this.productService.setPromotion(p.id).subscribe({
      next : (data:boolean)=>{
        p.promotion=!promo;
      },
      error: err=>{
        this.errorMessage=err;
      }
    })
  }
  handleSearchProduct()
  {
      let Keyword=this.searchFormGroup.value.Keyword;
      this.productService.SearchProduct(Keyword).subscribe({
        next:(data)=>{
          this.products=data;
        }
      })
  }
  HandleNewProduct(){
      this.router.navigateByUrl("/admin/addProduct");
  }
  HandleEditProduct(p:Product){
      this.router.navigateByUrl("/admin/editProduct/"+p.id);
  }
}
