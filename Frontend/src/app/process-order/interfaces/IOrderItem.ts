import {IOrder} from "./IOrder";
import {IProduct} from "../../admin/products/interfaces/i-product";
import {SizeModel} from "../../shop/models/size.model";
import {ColorModel} from "../../shop/models/color.model";

export interface IOrderItem {
  id: number;
  product: IProduct;
  quantity: number;
  size: SizeModel;
  color: ColorModel;
}

interface IOrderItemBase {
  product: IProduct;
  quantity: number;
  size_id: number;
  color_id: number;
  total: number;
}

export interface IOrderItem extends IOrderItemBase {
  id: number;
  order: IOrder;
}

export interface IOrderItemRequest extends IOrderItemBase {

}
