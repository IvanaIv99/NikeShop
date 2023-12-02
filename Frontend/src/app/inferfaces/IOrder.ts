import {User} from "./IUser";
import {PaymentOption} from "./IPaymentOption";

export interface Order {
  id: number;
  idUser: User;
  orderStatus: string;
  paymentOption: PaymentOption,
  totalPrice: number
}
