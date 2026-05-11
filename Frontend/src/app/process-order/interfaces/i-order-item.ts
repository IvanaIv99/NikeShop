import {ISize} from "../../shop/interfaces/i-size";
import {IColor} from "../../shop/interfaces/i-color";
import {IProduct} from "../../shop/interfaces/i-product";
import {IOrder} from "./i-order";

export interface IOrderItem {
  id: number;
  product: IProduct;
  quantity: number;
  size: ISize;
  color: IColor;
}

interface IOrderItemBase {
  productId: IProduct;
  quantity: number;
  sizeId: number;
  colorId: number;
  total: number;
}

export interface IOrderItem extends IOrderItemBase {
  id: number;
  order: IOrder;
}

export interface IOrderItemRequest extends IOrderItemBase {

}
