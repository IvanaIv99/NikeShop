import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProcessOrderComponent} from "./components/process-order/process-order.component";
import {OrderSuccessComponent} from "./components/order-success/order-success.component";

const routes: Routes = [
  {
    path: "",
    component: ProcessOrderComponent
  },
  {
    path: 'success/:id',
    component: OrderSuccessComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessOrderRoutingModule { }
