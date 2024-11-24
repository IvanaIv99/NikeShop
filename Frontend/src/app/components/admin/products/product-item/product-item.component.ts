import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "../../../../models/product.model";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../../services/product/product.service";
import {first} from "rxjs";
import {SnackbarService} from "../../../../services/common/snackbar/SnackbarService";

@Component({
  selector: 'tr[app-product-item]',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit  {

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
