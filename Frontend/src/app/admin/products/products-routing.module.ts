import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CartComponent} from "../../cart/components/cart/cart.component";
import {ProductsComponent} from "./components/products/products.component";

const routes: Routes = [
  {
    path: "",
    component: ProductsComponent,
  },
  {
    path: 'add',
    loadChildren: () => import('./components/products/components/product-form/components/product-form.module').then(m => m.ProductFormModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
