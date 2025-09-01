import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {BlProductsRequestService} from "../../bussiness-logic/requests/bl-products-request.service";
import {IProduct} from "../../interfaces/i-product";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ColumnType} from "../../../../shared/enums/column-type";
import {BlProductsTableService} from "../../bussiness-logic/tables/bl-products-table.service";
import {Router} from "@angular/router";
import {SnackbarService} from "../../../../shared/services/common/snackbar/SnackbarService";

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit{

  products: IProduct[] = [];

  constructor(
    public requestsService: BlProductsRequestService,
    public tableService: BlProductsTableService,
    public router: Router,
    public snackbarService: SnackbarService
  ) {
  }

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  columnTypeEnum = ColumnType;

  @Input() filters: {
    search?: string | null;
  };

  @Output() filterChange = new EventEmitter<{ total: number }>();

  ngOnInit() {
    this.getProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters'] && !changes['filters'].firstChange) {
      this.applyFilters();
    }
  }

  private applyFilters(): void {
    let filtered = [...this.products];

    if (this.filters.search) {
      const search = this.filters.search.toLowerCase();
      filtered = filtered.filter(o =>
        o.id.toString().includes(search) ||
        o.name.toLowerCase().includes(search)
      );
    }

    this.dataSource.data = filtered;

    if (this.paginator) {
      this.paginator.firstPage();
    }

    this.filterChange.emit({ total: filtered.length });
  }


  private getProducts(): any
  {
    this.requestsService.getAllProducts().subscribe({
      next: (response) => {
        this.dataSource.data = response['data'];
        this.products = response['data'];
      },
      error: (e) => console.error(e)
    });
  }

  doAction(row: IProduct): void {
    this.router.navigate(['/admin-panel/products/edit', row.id]);
  }

  delete(row: IProduct): void {
    this.requestsService.delete(row).subscribe(
      (response) => {
        this.snackbarService.showSuccess('Deleted.')
        window.location.reload();
      },
      (error) => {
        this.snackbarService.showError('Error deleting product:'+ error)
      }
    );
  }

}
