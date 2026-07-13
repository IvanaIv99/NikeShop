import {IOrder} from "./i-order";

export interface IOrderItemRequest {
  variantId: number;
  quantity: number;
}

export interface IOrderItem extends IOrderItemRequest {
  id: number;
  total: number;
  productName: string;
  productImage: string;
  sizeValue: string;
  colorName: string;
  unitPrice: string;
  order?: IOrder;
}
