import {ISize} from "../../shop/interfaces/i-size";
import {IColor} from "../../shop/interfaces/i-color";
import {IProduct} from "../../shop/interfaces/i-product";

export interface ICartItem {
  size: ISize;
  color: IColor;
  total: number;
  quantity: number;
  product: IProduct
}
