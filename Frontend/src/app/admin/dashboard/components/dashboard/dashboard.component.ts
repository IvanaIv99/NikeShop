import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // stats cards
  stats = [
    { icon: 'inventory_2', label: 'New Orders Today', value: 0 },
    { icon: 'paid', label: 'Revenue Today', value: '$0' },
    { icon: 'hourglass_top', label: 'Pending', value: 0 },
    { icon: 'local_shipping', label: 'Shipped', value: 0 }
  ];

  constructor(
    // private ordersService: OrdersService,
    // private exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    // pozovi servis da dobiješ statistiku; ovde je primer:
    // this.ordersService.getDashboardStats().subscribe(res => {
    //   this.stats[0].value = res.newToday;
    //   this.stats[1].value = '$' + res.revenueToday;
    //   this.stats[2].value = res.pending;
    //   this.stats[3].value = res.shipped;
    //   this.tableInfo.total = res.totalOrders;
    //   this.lastUpdated = new Date();
    // });

    // demo values:
    this.stats[0].value = 12;
    this.stats[1].value = '$1,240';
    this.stats[2].value = 7;
    this.stats[3].value = 34;
  }

}
