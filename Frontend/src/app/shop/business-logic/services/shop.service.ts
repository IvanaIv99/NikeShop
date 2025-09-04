import {Injectable} from '@angular/core';
import {IProduct} from "../../interfaces/i-product";

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  protected products: IProduct[];

  public addProductToCart(product: IProduct, event) {
    event.emit(product);
  }

  public onSelectedAttribute(value, attribute, product) {
    if(attribute == 'size')  product.selectedSize = value;
    if(attribute == 'color')  product.selectedColor = value;
  }
}
