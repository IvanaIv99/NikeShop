import { Component, OnInit } from '@angular/core';
import {OrderStatus} from "../../enums/order-status";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  filters: any = {
    status: null,
    dateFrom: null,
    dateTo: null,
    search: null
  };

  search = '';
  statusOptions = Object.values(OrderStatus);

  tableInfo = { total: 0 };

  constructor(
    // private ordersService: OrdersService,
    // private exportService: ExportService
  ) {}

  ngOnInit(): void {
  }

  applySearch(value: string) {
    this.filters = { ...this.filters, search: value || null };
  }

  applyStatus(value: string) {
    this.filters = { ...this.filters, status: value || null };
  }

  applyDateFrom(value: Date | null) {
    this.filters = { ...this.filters, dateFrom: value ? value.toISOString() : null };
  }

  applyDateTo(value: Date | null) {
    this.filters = { ...this.filters, dateTo: value ? value.toISOString() : null };
  }

  clearSearch() {
    this.search = '';
    this.filters.search = null;
    this.onFiltersChange();
  }

  onFiltersChange() {
    console.log('Filters updated:', this.filters);
  }

  clearFilters() {
    this.filters = { status: null, dateFrom: null, dateTo: null, search: null };
    this.search = '';
    this.onFiltersChange();
  }

  onTableFilterChange(e: any) {
    if (e.total !== undefined) {
      this.tableInfo.total = e.total;
    }
  }
}
