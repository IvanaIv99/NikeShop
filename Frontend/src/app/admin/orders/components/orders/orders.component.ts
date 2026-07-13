import { Component, OnInit } from '@angular/core';
import { EnumsService } from "../../../../shared/business-logic/services/enums/enums.service";
import { IEnumOption } from "../../../../shared/interfaces/i-enums";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public filters: any = {
    status: null,
    dateFrom: null,
    dateTo: null,
    search: null
  };

  public search = '';
  public statusOptions: IEnumOption[] = [];

  public tableInfo = { total: 0 };

  constructor(private enumsService: EnumsService) {}

  ngOnInit(): void {
    this.enumsService.getOrderStatuses().subscribe({
      next: (statuses) => this.statusOptions = statuses
    });
  }

  public applySearch(value: string) {
    this.filters = { ...this.filters, search: value || null };
  }

  public applyStatus(value: string) {
    this.filters = { ...this.filters, status: value || null };
  }

  public applyDateFrom(value: Date | null) {
    this.filters = { ...this.filters, dateFrom: value ? value.toISOString() : null };
  }

  public applyDateTo(value: Date | null) {
    this.filters = { ...this.filters, dateTo: value ? value.toISOString() : null };
  }

  public clearSearch() {
    this.search = '';
    this.filters.search = null;
    this.onFiltersChange();
  }

  public onFiltersChange() {
    console.log('Filters updated:', this.filters);
  }

  public clearFilters() {
    this.filters = { status: null, dateFrom: null, dateTo: null, search: null };
    this.search = '';
    this.onFiltersChange();
  }

  public onTableFilterChange(e: any) {
    if (e.total !== undefined) {
      this.tableInfo.total = e.total;
    }
  }
}
