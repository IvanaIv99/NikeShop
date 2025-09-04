import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../shared/shared.module';
import {ShopComponent} from "./components/shop/shop.component";
import {ProductComponent} from "./components/product/product.component";
import {ProductListComponent} from "./components/product-list/product-list.component";
import {ProductFilterPipe} from "./pipes/product-filter.pipe";

@NgModule({
  declarations: [
    ShopComponent,
    ProductComponent,
    ProductListComponent,
    ProductFilterPipe
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule
  ]
})
export class ShopModule { }
