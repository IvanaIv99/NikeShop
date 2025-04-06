import {SizeModel} from "../../shop/models/size.model";
import {ColorModel} from "../../shop/models/color.model";
import {IProduct} from "../../admin/products/interfaces/i-product";

export interface ICartItem {
  size: SizeModel;
  color: ColorModel;
  total: number;
  quantity: number;
  product: IProduct
}
