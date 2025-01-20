import {IOrder} from "./IOrder";
import {IProduct} from "../../admin/products/interfaces/i-product";
import {SizeModel} from "../../shop/models/size.model";
import {ColorModel} from "../../shop/models/color.model";

export interface IOrderItem {
  id: number;
  idProduct: IProduct;
  quantity: number;
  size: SizeModel;
  color: ColorModel;
}

interface IOrderItemBase {
  idProduct: IProduct;
  quantity: number;
  idSize: number;
  idColor: number;
  total: number;
}

export interface IOrderItem extends IOrderItemBase {
  id: number;
  idOrder: IOrder;
}

export interface IOrderItemRequest extends IOrderItemBase {

}
