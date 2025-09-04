export interface IProductsStatistics {
  three_top_selling: IProduct[];
}

export interface IProduct {
  id: number;
  name: string;
  orders_count: number;
  image: string;
}
