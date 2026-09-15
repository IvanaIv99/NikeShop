import { Component, OnInit } from '@angular/core';
import { BlProductsRequestService } from '../../bussiness-logic/requests/bl-products-request.service';
import { ICategory } from '../../../../shop/interfaces/i-category';
import { IProductListParams } from '../../../../shared/interfaces/i-paginated';

type StockFilter = 'in' | 'out' | null;

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrl: './products.component.css',
    standalone: false
})
export class ProductsComponent implements OnInit {
  filters: IProductListParams = { search: null, category: null, stock: null };

  search = '';
  tableInfo = { total: 0 };

  categories: ICategory[] = [];

  private readonly stockCycle: StockFilter[] = [null, 'in', 'out'];

  constructor(private productsRequestService: BlProductsRequestService) {}

  ngOnInit(): void {
    this.productsRequestService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  get hasActiveFilters(): boolean {
    return !!(this.search || this.filters.category || this.filters.stock);
  }

  applySearch(value: string): void {
    this.filters = { ...this.filters, search: value || null };
  }

  selectCategory(categoryId: number | null): void {
    this.filters = { ...this.filters, category: categoryId };
  }

  cycleStock(): void {
    const next = this.stockCycle[(this.stockCycle.indexOf(this.filters.stock ?? null) + 1) % this.stockCycle.length];
    this.filters = { ...this.filters, stock: next };
  }

  get stockLabel(): string {
    switch (this.filters.stock) {
      case 'in': return 'in stock';
      case 'out': return 'out of stock';
      default: return 'any';
    }
  }

  clearFilters(): void {
    this.filters = { search: null, category: null, stock: null };
    this.search = '';
  }

  onTableFilterChange(e: { total: number }): void {
    if (e.total !== undefined) {
      this.tableInfo.total = e.total;
    }
  }
}
