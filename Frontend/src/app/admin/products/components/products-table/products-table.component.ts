import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../../../shop/business-logic/product.service";
import {BlProductsRequestService} from "../../bussiness-logic/requests/bl-products-request.service";
import {IProduct} from "../../interfaces/i-product";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ColumnType} from "../../../../shared/enums/column-type";
import {BlProductsTableService} from "../../bussiness-logic/tables/bl-products-table.service";
import {IOrder} from "../../../orders/interfaces/i-order";
import {ActivatedRoute, Router} from "@angular/router";
import {SnackbarService} from "../../../../shared/services/common/snackbar/SnackbarService";

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  // styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit{

  products: IProduct[];

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


  ngOnInit() {
    this.getProducts();
  }

  private getProducts(): any
  {
    this.requestsService.getAllProducts().subscribe({
      next: (response) => {
        this.dataSource.data = response['data'];
      },
      error: (e) => console.error(e)
    });
  }

  doAction(row: IProduct): void {
    this.router.navigate(['/admin-panel/product/edit', row.id]);
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
