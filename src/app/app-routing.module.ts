import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { LoginComponent } from './login/login.component';
import { AdminComponentComponent } from './admin-component/admin-component.component';
import { authenticationGuard } from './guards/authentication.guard';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"",component:LoginComponent},
  {path:"admin",component:AdminComponentComponent,canActivate:[authenticationGuard()],children:
  [
    {path:"products",component:ProductsComponent},
    {path:"customers",component:CustomersComponent},
    {path:"addProduct",component:NewProductComponent},
    {path:"editProduct/:id",component:EditProductComponent}
  ]},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
