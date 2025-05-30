import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./components/products/products.component";
import {ProductFormComponent} from "./components/products-form/product-form.component";

const routes: Routes = [
  {
    path: "",
    component: ProductsComponent,
  },
  {
    path: 'add',
    component: ProductFormComponent
  },
  {
    path: 'edit/:id',
    component: ProductFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
