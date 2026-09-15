export interface IOrderSummaryItem {
  variantId: number;
  quantity: number;
  available: number;
  inStock: boolean;
}

export interface IOrderSummary {
  subtotal: number;
  shipping: number;
  grandTotal: number;
  allInStock: boolean;
  items: IOrderSummaryItem[];
}
