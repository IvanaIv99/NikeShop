import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from '../shared/shared.module';
import {CartComponent} from "./components/cart/cart.component";
import {CartItemComponent} from "./components/cart-item/cart-item.component";
import {CartTableComponent} from "./components/cart-table/cart-table.component";

@NgModule({
  declarations: [
    CartComponent,
    CartItemComponent,
    CartTableComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule
  ]
})
export class CartModule { }
