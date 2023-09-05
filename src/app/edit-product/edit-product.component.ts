import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../Model/Product';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

    productId!:string;
    product!:Product;
    productFromGroup!:FormGroup;

  constructor(private route:ActivatedRoute,private prodService:ProductService,private fb:FormBuilder){
    this.productId=this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
      this.prodService.getProduct(this.productId).subscribe({
        next:(data)=>{
          this.product=data!!;
          this.productFromGroup=this.fb.group({
            name:this.fb.control(this.product.name,[Validators.required,Validators.minLength(4)]),
            price:this.fb.control(this.product.price,Validators.required),
            promotion:this.fb.control(this.product.promotion,Validators.required)
           })
        },error:err=>console.log(err)
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

handleEditProduct(){
    let p=this.productFromGroup.value;
    p.id=this.productId;
    this.prodService.updateProduct(p).subscribe({
      next:(data)=>{
        alert("Product updated ")
      },error:err=>console.log(err)
    })

}
}
