export interface IEnumOption {
  value: string;
  label: string;
}

export interface IEnums {
  orderStatuses: IEnumOption[];
  paymentMethods: IEnumOption[];
}
