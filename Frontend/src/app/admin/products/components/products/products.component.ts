import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  filters: any = {
    search: null
  };

  search = '';
  tableInfo = { total: 0 };

  applySearch(value: string) {
    this.filters = { ...this.filters, search: value || null };
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
    this.filters = {search: null };
    this.search = '';
    this.onFiltersChange();
  }

  onTableFilterChange(e: any) {
    if (e.total !== undefined) {
      this.tableInfo.total = e.total;
    }
  }
}
