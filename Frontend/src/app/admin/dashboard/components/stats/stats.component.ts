import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BlOrdersRequestsService } from '../../../orders/bussiness-logic/requests/bl-orders-requests.service';
import { IStatCard } from '../../../../shared/inferfaces/admin/i-stat-card';
import { IRangedStats } from '../../../orders/interfaces/i-today-stats';
import { DashboardRange } from '../../../../shared/inferfaces/admin/dashboard-range';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss'],
    standalone: false
})
export class StatsComponent implements OnInit, OnChanges {
  @Input() range: DashboardRange = '24h';

  stats: IStatCard[] = this.buildCards();
  public loading = true;

  private rangedStats?: IRangedStats;

  constructor(
    private ordersRequestsService: BlOrdersRequestsService,
  ) {}

  ngOnInit(): void {
    this.ordersRequestsService.getStats().subscribe({
      next: (res) => {
        this.rangedStats = res;
        this.stats = this.buildCards();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  ngOnChanges(): void {
    this.stats = this.buildCards();
  }

  public get rangePill(): string {
    switch (this.range) {
      case '24h': return 'last 24h';
      case '12w': return 'last 12w';
      case 'ytd': return 'YTD';
    }
  }

  public get rangeSub(): string {
    switch (this.range) {
      case '24h': return 'from the last 24 hours';
      case '12w': return 'from the last 12 weeks';
      case 'ytd': return 'from year to date';
    }
  }

  private buildCards(): IStatCard[] {
    const s = this.rangedStats?.[this.range];
    return [
      { icon: 'inventory_2', label: 'New Orders', value: s?.orders_count ?? 0 },
      { icon: 'paid', label: 'Revenue', value: `$ ${s?.revenue ?? 0}` },
      { icon: 'hourglass_top', label: 'Received', value: s?.received ?? 0 },
      { icon: 'local_shipping', label: 'Shipped', value: s?.shipped ?? 0 }
    ];
  }
}
