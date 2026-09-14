import { ByRange } from '../../../shared/inferfaces/admin/dashboard-range';

export type IProductsStatistics = ByRange<IProduct[]>;

export interface IProduct {
  id: number;
  name: string;
  orders_count: number;
  image: string;
}
