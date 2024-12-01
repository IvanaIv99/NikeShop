import {Order} from "./IOrder";
import {Product} from "./IProduct";

export interface OrderItem {
  id: number;
  idOrder: Order;
  idProduct: Product;
  quantity: number;
  color: string;
  totalPrice: number
}
