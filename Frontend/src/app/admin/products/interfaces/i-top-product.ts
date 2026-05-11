export interface IProductsStatistics {
  topSelling: IProduct[];
}

export interface IProduct {
  id: number;
  name: string;
  orders_count: number;
  image: string;
}
