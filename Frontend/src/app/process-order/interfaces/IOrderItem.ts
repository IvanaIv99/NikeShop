import {IOrder} from "./IOrder";
import {IProduct} from "../../admin/products/interfaces/i-product";
import {SizeModel} from "../../shop/models/size.model";
import {ColorModel} from "../../shop/models/color.model";

export interface IOrderItem {
  id: number;
  product_id: IProduct;
  quantity: number;
  size: SizeModel;
  color: ColorModel;
}

interface IOrderItemBase {
  product_id: IProduct;
  quantity: number;
  size_id: number;
  color_id: number;
  total: number;
}

export interface IOrderItem extends IOrderItemBase {
  id: number;
  order_id: IOrder;
}

export interface IOrderItemRequest extends IOrderItemBase {

}
