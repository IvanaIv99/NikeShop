export type DashboardRange = '24h' | '12w' | 'ytd';

export type ByRange<T> = Record<DashboardRange, T>;
