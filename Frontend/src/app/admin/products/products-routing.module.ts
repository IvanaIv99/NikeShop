import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsDashboardComponent} from "./components/products-dashboard/products-dashboard.component";
import {ProductFormComponent} from "./components/products-form/product-form.component";

const routes: Routes = [
  {
    path: "",
    component: ProductsDashboardComponent,
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
