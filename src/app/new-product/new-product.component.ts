import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  newProductForm!:FormGroup;
  constructor(private fb:FormBuilder,private prodService:ProductService,private router:Router){

  }



  ngOnInit(): void {
   this.newProductForm=this.fb.group({
    name:this.fb.control(null,[Validators.required,Validators.minLength(4)]),
    price:this.fb.control(null,Validators.required),
    promotion:this.fb.control(false,Validators.required)
   })
  }
  handleAddProduct(){
    let product=this.newProductForm.value;
    this.prodService.AddNewProduct(product).subscribe({
      next:(data)=>{
        alert("Product added successfully");
        this.newProductForm.reset();
      },error:err=>{
        console.log(err);
      }
    })
  }

  getErrorMessage(controlName:string,errors:ValidationErrors){
      if(errors['required']){
        return controlName +"is Required";
      }
      else if(errors['minlength']){
        return controlName+ "should have at least "+errors['minlength']['requiredLength']+"Charcters";
      }else return "";
  }
}
