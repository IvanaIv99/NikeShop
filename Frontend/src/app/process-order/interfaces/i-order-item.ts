import {IOrder} from "./i-order";

interface IOrderItemBase {
  variantId: number;
  quantity: number;
  total: number;
}

export interface IOrderItem extends IOrderItemBase {
  id: number;
  productName: string;
  productImage: string;
  sizeValue: string;
  colorName: string;
  unitPrice: string;
  order?: IOrder;
}

export interface IOrderItemRequest extends IOrderItemBase {}
