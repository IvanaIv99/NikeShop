import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ColumnType} from "../../../../shared/enums/column-type";
import {BlOrdersTableService} from "../../bussiness-logic/tables/bl-orders-table.service";
import {BlOrdersRequestsService} from "../../bussiness-logic/requests/bl-orders-requests.service";
import {IOrder} from "../../interfaces/i-order";
import {MatDialog} from "@angular/material/dialog";
import {OrderComponent} from "../order/order.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  //styleUrls: ['./order-table.component.scss']
})
export class OrdersTableComponent implements OnInit {

  constructor(
    public requestsService: BlOrdersRequestsService,
    public tableService: BlOrdersTableService,
    public dialog: MatDialog,
    public router: Router
  ) {
  }

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  columnTypeEnum = ColumnType;

  ngOnInit() {
    this.getAllOrders();
  }

  private getAllOrders(): any
  {
    this.requestsService.getAllOrders().subscribe({
      next: (response) => {
        this.dataSource.data = response['data'];
      },
      error: (e) => console.error(e)
    });
  }

  doAction(row: IOrder): void {
    this.router.navigate(['/admin-panel/orders', row.id]);
  }



}
