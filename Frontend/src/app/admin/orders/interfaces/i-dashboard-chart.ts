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
  ranges: {
    '24h': IChartBucket[];
    '12w': IChartBucket[];
    'ytd': IChartBucket[];
  };
  activity: IActivityOrder[];
}
