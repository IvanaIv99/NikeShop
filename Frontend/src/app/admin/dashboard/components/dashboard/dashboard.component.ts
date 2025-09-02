import { Component, OnInit } from '@angular/core';
import { BlOrdersRequestsService } from '../../../orders/bussiness-logic/requests/bl-orders-requests.service';
import { BlProductsRequestService } from '../../../products/bussiness-logic/requests/bl-products-request.service';
import {ITopProduct} from "../../../products/interfaces/i-top-product";
import {IStatCard} from "../../../../shared/inferfaces/admin/i-stat-card";

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: IStatCard[] = [
    { icon: 'inventory_2', label: 'New Orders Today', value: 0 },
    { icon: 'paid', label: 'Revenue Today', value: '$0' },
    { icon: 'hourglass_top', label: 'Received', value: 0 },
    { icon: 'local_shipping', label: 'Shipped', value: 0 }
  ];

  topProducts: ITopProduct[];

  constructor(
    private ordersRequestsService: BlOrdersRequestsService,
    private productsRequestsService: BlProductsRequestService
  ) {}

  ngOnInit(): void {
    this.loadTodaysOrderStatistics();
    this.loadTopProducts();
  }

  loadTopProducts() {
    this.productsRequestsService.getTopProducts().subscribe(data => {
      this.topProducts = data;
    });
  }

  loadTodaysOrderStatistics() {
    this.ordersRequestsService.getTodayStats().subscribe(res => {
      let data = res['data'];
      this.stats = [
        { icon: 'inventory_2', label: 'New Orders Today', value: data.orders_count },
        { icon: 'paid', label: 'Revenue Today', value: `$ ${data.revenue}` },
        { icon: 'hourglass_top', label: 'Received', value: data.received },
        { icon: 'local_shipping', label: 'Shipped', value: data.shipped }
      ];
    });
  }
}
