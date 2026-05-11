import {Component, Input, OnInit} from '@angular/core';
import {SnackbarService} from "../../../../shared/business-logic/services/common/snackbar/snackbar.service";
import {BlProductsRequestService} from "../../bussiness-logic/requests/bl-products-request.service";
import {IProduct} from "../../../../shop/interfaces/i-product";
@Component({
  selector: 'tr[app-product-item]',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit  {

  @Input() productItem: IProduct;
  @Input() index: number;

  constructor(
    private productService: BlProductsRequestService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {}

  public distinctSizes(): (string | number)[] {
    if (!this.productItem?.variants) return [];
    const seen = new Set<number>();
    const out: (string | number)[] = [];
    for (const v of this.productItem.variants) {
      if (!seen.has(v.size.id)) {
        seen.add(v.size.id);
        out.push(v.size.size);
      }
    }
    return out;
  }

  public distinctColors(): string[] {
    if (!this.productItem?.variants) return [];
    const seen = new Set<number>();
    const out: string[] = [];
    for (const v of this.productItem.variants) {
      if (!seen.has(v.color.id)) {
        seen.add(v.color.id);
        out.push(v.color.name);
      }
    }
    return out;
  }

  public deleteProduct(productId:any)
  {
    this.productService.delete(productId).subscribe(
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
