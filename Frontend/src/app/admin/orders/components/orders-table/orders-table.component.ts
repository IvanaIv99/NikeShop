import {Component, OnInit} from '@angular/core';
import {BlOrdersApiService} from "../../bussiness-logic/api/bl-orders-api.service";
import {IOrder} from "../../interfaces/i-order";

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  //styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {

  orders: IOrder[];

  constructor(
    public requestsService: BlOrdersApiService,
  ) {
  }

  ngOnInit() {
    this.getAllOrders();
  }

  private getAllOrders(): any
  {
    this.requestsService.getAll().subscribe({
      next: (response) => {
        this.orders = response['data'];
      },
      error: (e) => console.error(e)
    });
  }

}
