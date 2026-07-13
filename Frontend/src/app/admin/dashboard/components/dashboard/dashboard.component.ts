import { Component, OnInit } from '@angular/core';
import { BlOrdersRequestsService } from '../../../orders/bussiness-logic/requests/bl-orders-requests.service';
import { IActivityOrder, IChartBucket, IDashboardChart } from '../../../orders/interfaces/i-dashboard-chart';

type Range = '24h' | '12w' | 'ytd';

interface ChartPoint {
  label: string;
  revenue: number;
  orders: number;
  x: number;
  y: number;
}

interface ActivityEvent {
  ts: string;
  title: string;
  subtitle: string;
  tag: 'order' | 'shipped' | 'cancelled' | 'refunded' | 'received';
}

const CHART_W = 780;
const CHART_H = 200;
const CHART_PAD_TOP = 20;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  range: Range = '12w';

  chartPoints: ChartPoint[] = [];
  chartLinePath = '';
  chartFillPath = '';
  chartMax = 0;
  chartTotal = 0;
  chartGridLines = [40, 100, 160];
  hasOrders = false;
  loading = true;

  activity: ActivityEvent[] = [];

  private ranges?: IDashboardChart['ranges'];

  constructor(private ordersRequestsService: BlOrdersRequestsService) {}

  ngOnInit(): void {
    this.ordersRequestsService.getChart().subscribe({
      next: (chart) => {
        this.ranges = chart.ranges;
        this.buildChart();
        this.buildActivity(chart.activity || []);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  setRange(r: Range): void {
    if (r === this.range) return;
    this.range = r;
    this.buildChart();
  }

  get rangeLabel(): string {
    switch (this.range) {
      case '24h': return 'USD · last 24 hours';
      case '12w': return 'USD · last 12 weeks';
      case 'ytd': return 'USD · year to date';
    }
  }

  get rangeBucketWord(): string {
    switch (this.range) {
      case '24h': return 'hour';
      case '12w': return 'week';
      case 'ytd': return 'month';
    }
  }

  private buildChart(): void {
    const buckets: IChartBucket[] = this.ranges ? this.ranges[this.range] : [];

    this.hasOrders = buckets.some(b => b.revenue > 0);
    this.chartMax = Math.max(1, ...buckets.map(b => b.revenue));
    this.chartTotal = buckets.reduce((s, b) => s + b.revenue, 0);

    const denom = Math.max(1, buckets.length - 1);
    const range = CHART_H - CHART_PAD_TOP;
    this.chartPoints = buckets.map((b, i) => ({
      label: b.label,
      revenue: b.revenue,
      orders: b.orders,
      x: (i / denom) * CHART_W,
      y: CHART_H - (b.revenue / this.chartMax) * range
    }));

    this.chartLinePath = this.chartPoints.map((b, i) => `${i === 0 ? 'M' : 'L'}${b.x.toFixed(1)},${b.y.toFixed(1)}`).join(' ');
    this.chartFillPath = `${this.chartLinePath} L${CHART_W},${CHART_H} L0,${CHART_H} Z`;
  }

  private buildActivity(orders: IActivityOrder[]): void {
    const sorted = [...orders].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    this.activity = sorted.slice(0, 6).map(o => {
      const first = o.firstName ?? '';
      const last = o.lastName ?? '';
      const subtotal = o.subtotal ?? '0';
      const customer = (first || last) ? `${first} ${last}`.trim() : (o.email ?? 'customer');
      return {
        ts: this.formatActivityTime(new Date(o.createdAt)),
        title: `Order #ORD-${o.id} · ${customer}`,
        subtitle: `$${subtotal} · ${o.status}`,
        tag: this.tagFor(o.status)
      };
    });
  }

  private tagFor(status: string): ActivityEvent['tag'] {
    if (status === 'shipped') return 'shipped';
    if (status === 'cancelled') return 'cancelled';
    if (status === 'refunded') return 'refunded';
    if (status === 'received') return 'received';
    return 'order';
  }

  private formatActivityTime(d: Date): string {
    const now = new Date();
    const diffMs = +now - +d;
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `${diffH}h ago`;
    const diffD = Math.floor(diffH / 24);
    if (diffD < 7) return `${diffD}d ago`;
    return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
  }

  get yAxisLabels(): { y: number; label: string }[] {
    const range = CHART_H - CHART_PAD_TOP;
    return [
      { y: CHART_H - range * 1.0, label: this.formatMoney(this.chartMax) },
      { y: CHART_H - range * 0.66, label: this.formatMoney(this.chartMax * 0.66) },
      { y: CHART_H - range * 0.33, label: this.formatMoney(this.chartMax * 0.33) }
    ];
  }

  formatMoney(n: number): string {
    if (n >= 1000) return `$${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
    return `$${Math.round(n)}`;
  }
}
