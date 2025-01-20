import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import {ProductFormComponent} from "./components/products-form/product-form.component";
import {SharedModule} from "../../shared/shared.module";
import {ProductComponent} from "./components/product/product.component";
import {ProductsDashboardComponent} from "./components/products-dashboard/products-dashboard.component";
import {ProductsTableComponent} from "./components/products-table/products-table.component";

@NgModule({
  declarations: [
    ProductFormComponent,
    ProductComponent,
    ProductsDashboardComponent,
    ProductsTableComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    NgOptimizedImage,
  ]
})
export class ProductsModule { }
