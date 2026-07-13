import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Subject, takeUntil } from 'rxjs';
import { ColumnType } from "../../../../shared/enums/column-type";
import { BlOrdersTableService } from "../../bussiness-logic/tables/bl-orders-table.service";
import { BlOrdersRequestsService } from "../../bussiness-logic/requests/bl-orders-requests.service";
import { Router } from "@angular/router";
import {IOrder} from "../../../../process-order/interfaces/i-order";
import {SnackbarService} from "../../../../shared/business-logic/services/common/snackbar/snackbar.service";

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnChanges, AfterViewInit, OnDestroy {

  @Input() filters: {
    status?: string | null;
    search?: string | null;
    dateFrom?: string | null;
    dateTo?: string | null;
  };

  @Output() filterChange = new EventEmitter<{ total: number }>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<IOrder>([]);

  columnTypeEnum = ColumnType;

  private destroy$ = new Subject<void>();

  constructor(
    private requestsService: BlOrdersRequestsService,
    public tableService: BlOrdersTableService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngAfterViewInit(): void {
    this.paginator.pageSize = this.tableService.pageSizeOptions[0];
    this.paginator.page
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.loadOrders());

    // Defer to next tick — the paginator's pageSize is set within this hook.
    Promise.resolve().then(() => this.loadOrders());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters'] && !changes['filters'].firstChange && this.paginator) {
      this.paginator.pageIndex = 0;
      this.loadOrders();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadOrders(): void {
    this.requestsService.getAllOrders({
      status: this.filters?.status || null,
      search: this.filters?.search || null,
      dateFrom: this.filters?.dateFrom || null,
      dateTo: this.filters?.dateTo || null,
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
        error: () => this.snackbarService.showError('Error getting orders.')
      });
  }

  navigateOrderDetails(order: IOrder): void {
    this.router.navigate(['/admin-panel/orders', order.id]);
  }
}
