import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { BlProductsRequestService } from "../../bussiness-logic/requests/bl-products-request.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { ColumnType } from "../../../../shared/enums/column-type";
import { BlProductsTableService } from "../../bussiness-logic/tables/bl-products-table.service";
import { Router } from "@angular/router";
import { SnackbarService } from "../../../../shared/business-logic/services/common/snackbar/SnackbarService";
import { IProduct } from "../../../../shop/interfaces/i-product";
import { Subject, takeUntil } from 'rxjs';
import {ConfirmDialogComponent} from "../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit, AfterViewInit, OnDestroy {

  products: IProduct[] = [];
  dataSource: MatTableDataSource<IProduct> = new MatTableDataSource<IProduct>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  columnTypeEnum = ColumnType;

  @Input() filters: { search?: string | null };
  @Output() filterChange = new EventEmitter<{ total: number }>();

  private destroy$ = new Subject<void>();

  constructor(
    private requestsService: BlProductsRequestService,
    protected tableService: BlProductsTableService,
    private router: Router,
    private snackbarService: SnackbarService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters'] && !changes['filters'].firstChange) {
      this.applyFilters();
    }
  }

  private loadProducts(): void {
    this.requestsService.getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: IProduct[]) => {
          this.products = response;
          this.applyFilters();
        },
        error: (error) => console.error(error)
      });
  }

  private applyFilters(): void {
    let filtered = [...this.products];

    if (this.filters?.search) {
      const search = this.filters.search.toLowerCase();
      filtered = filtered.filter(p =>
        p.id.toString().includes(search) ||
        p.name.toLowerCase().includes(search)
      );
    }

    this.dataSource.data = filtered;
    this.paginator?.firstPage();

    this.filterChange.emit({ total: filtered.length });
  }

  doAction(row: IProduct): void {
    this.router.navigate(['/admin-panel/products/edit', row.id]);
  }

  delete(row: IProduct): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Are you sure you want to delete ${row.name}?` }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.requestsService.delete(row)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.snackbarService.showSuccess('Deleted.');
              this.products = this.products.filter(p => p.id !== row.id);
              this.applyFilters();
            },
            error: (error) => this.snackbarService.showError('Error deleting product: ' + error)
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
