import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EnumsService } from "../../../../shared/business-logic/services/enums/enums.service";
import { IEnumOption } from "../../../../shared/interfaces/i-enums";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
    standalone: false
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

  // Reactive range so the picker reliably writes the selection back into the
  // inputs; `filters` keeps the string form the backend expects.
  public dateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  public tableInfo = { total: 0 };

  constructor(private enumsService: EnumsService) {}

  ngOnInit(): void {
    this.enumsService.getOrderStatuses().subscribe({
      next: (statuses) => this.statusOptions = statuses
    });

    this.dateRange.valueChanges.subscribe(({ start, end }) => {
      this.filters = {
        ...this.filters,
        dateFrom: start ? this.toDateString(start) : null,
        dateTo: end ? this.toDateString(end) : null,
      };
    });
  }

  public applySearch(value: string) {
    this.filters = { ...this.filters, search: value || null };
  }

  public applyStatus(value: string) {
    this.filters = { ...this.filters, status: value || null };
  }

  private toDateString(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
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
    this.dateRange.reset();
    this.onFiltersChange();
  }

  public onTableFilterChange(e: any) {
    if (e.total !== undefined) {
      this.tableInfo.total = e.total;
    }
  }
}
