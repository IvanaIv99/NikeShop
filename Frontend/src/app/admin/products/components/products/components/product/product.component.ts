import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../../../../../shop/business-logic/product.service";
import {SnackbarService} from "../../../../../../shared/services/common/snackbar/SnackbarService";
import {ProductModel} from "../../../../../../shop/models/product.model";
@Component({
  selector: 'tr[app-product-item]',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit  {

  @Input() productItem: ProductModel;
  @Input() index: number;

  constructor(
    private productService: ProductService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {}

  public deleteProduct(productId:any)
  {
    this.productService.deleteProduct(productId).subscribe(
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
