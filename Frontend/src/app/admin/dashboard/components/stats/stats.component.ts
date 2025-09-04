import { Component, OnInit } from '@angular/core';
import { BlOrdersRequestsService } from '../../../orders/bussiness-logic/requests/bl-orders-requests.service';
import {IStatCard} from "../../../../shared/inferfaces/admin/i-stat-card";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  stats: IStatCard[] = [
    { icon: 'inventory_2', label: 'New Orders Today', value: 0 },
    { icon: 'paid', label: 'Revenue Today', value: '$0' },
    { icon: 'hourglass_top', label: 'Received', value: 0 },
    { icon: 'local_shipping', label: 'Shipped', value: 0 }
  ];

  constructor(
    private ordersRequestsService: BlOrdersRequestsService,
  ) {}

  ngOnInit(): void {
    this.loadTodaysOrderStatistics();
  }

  public loadTodaysOrderStatistics() {
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
