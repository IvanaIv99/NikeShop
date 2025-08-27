import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { ColumnType } from "../../../../shared/enums/column-type";
import { BlOrdersTableService } from "../../bussiness-logic/tables/bl-orders-table.service";
import { BlOrdersRequestsService } from "../../bussiness-logic/requests/bl-orders-requests.service";
import { IOrder } from "../../interfaces/i-order";
import { Router } from "@angular/router";

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() filters: {
    status?: string | null;
    search?: string | null;
    dateFrom?: string | null;
    dateTo?: string | null;
  };

  @Output() filterChange = new EventEmitter<{ total: number }>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<IOrder>([]);
  allOrders: IOrder[] = [];

  columnTypeEnum = ColumnType;

  constructor(
    private requestsService: BlOrdersRequestsService,
    public tableService: BlOrdersTableService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters'] && !changes['filters'].firstChange) {
      this.applyFilters();
    }
  }

  private loadOrders(): void {
    this.requestsService.getAllOrders().subscribe({
      next: (response) => {
        this.allOrders = response['data'] || [];
        this.applyFilters();
      },
      error: (e) => console.error('Error loading orders', e)
    });
  }

  private applyFilters(): void {
    let filtered = [...this.allOrders];

    if (this.filters.status) {
      filtered = filtered.filter(o => o.status === this.filters.status);
    }

    if (this.filters.search) {
      const search = this.filters.search.toLowerCase();
      filtered = filtered.filter(o =>
        o.id.toString().includes(search) ||
        o.first_name.toLowerCase().includes(search) ||
        o.last_name.toLowerCase().includes(search) ||
        o.email.toLowerCase().includes(search)
      );
    }

    if (this.filters.dateFrom) {
      const from = new Date(this.filters.dateFrom);
      filtered = filtered.filter(o => new Date(o.created_at) >= from);
    }
    if (this.filters.dateTo) {
      const to = new Date(this.filters.dateTo);
      filtered = filtered.filter(o => new Date(o.created_at) <= to);
    }

    this.dataSource.data = filtered;

    if (this.paginator) {
      this.paginator.firstPage();
    }

    this.filterChange.emit({ total: filtered.length });
  }

  navigateOrderDetails(order: IOrder): void {
    this.router.navigate(['/admin-panel/orders', order.id]);
  }
}
