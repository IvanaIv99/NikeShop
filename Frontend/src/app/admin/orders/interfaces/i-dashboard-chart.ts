import { ByRange } from '../../../shared/inferfaces/admin/dashboard-range';

export interface IChartBucket {
  label: string;
  revenue: number;
  orders: number;
}

export interface IActivityOrder {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  subtotal: string;
  status: string;
  createdAt: string;
}

export interface IDashboardChart {
  ranges: ByRange<IChartBucket[]>;
  activity: ByRange<IActivityOrder[]>;
}
