import { ByRange } from '../../../shared/inferfaces/admin/dashboard-range';

export interface ITodayStats {
  orders_count: number;
  revenue: number;
  shipped: number;
  received: number;
}

export type IRangedStats = ByRange<ITodayStats>;
