import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import {ProductsComponent} from "./components/products/products.component";
import {ProductFormComponent} from "./components/products/components/product-form/components/product-form/product-form.component";
import {SharedModule} from "../../shared/shared.module";
import {ProductComponent} from "./components/products/components/product/product.component";

@NgModule({
  declarations: [
    ProductsComponent,
    ProductFormComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
  ]
})
export class ProductsModule { }
