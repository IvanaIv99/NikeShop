import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { BlProductsRequestService } from "../../bussiness-logic/requests/bl-products-request.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { ColumnType } from "../../../../shared/enums/column-type";
import { BlProductsTableService } from "../../bussiness-logic/tables/bl-products-table.service";
import { Router } from "@angular/router";
import { SnackbarService } from "../../../../shared/business-logic/services/common/snackbar/snackbar.service";
import { IProduct } from "../../../../shop/interfaces/i-product";
import { Subject, takeUntil } from 'rxjs';
import {ConfirmDialogComponent} from "../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements AfterViewInit, OnChanges, OnDestroy {

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

  ngAfterViewInit(): void {
    this.paginator.pageSize = this.tableService.pageSizeOptions[0];
    this.paginator.page
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.loadProducts());

    // Defer to next tick — the paginator's pageSize is set within this hook.
    Promise.resolve().then(() => this.loadProducts());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters'] && !changes['filters'].firstChange && this.paginator) {
      this.paginator.pageIndex = 0;
      this.loadProducts();
    }
  }

  private loadProducts(): void {
    this.requestsService.getAllProducts({
      search: this.filters?.search || null,
      page: this.paginator.pageIndex + 1,
      perPage: this.paginator.pageSize
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.data;
          this.paginator.length = response.meta.total;
          this.filterChange.emit({ total: response.meta.total });
        },
        error: (error) => console.error(error)
      });
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
              this.loadProducts();
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
