export interface IPaginationMeta {
  page: number;
  perPage: number;
  total: number;
  lastPage: number;
}

export interface IPaginated<T> {
  data: T[];
  meta: IPaginationMeta;
}

export interface IListParams {
  search?: string | null;
  page?: number;
  perPage?: number;
}

export interface IOrderListParams extends IListParams {
  status?: string | null;
  dateFrom?: string | null;
  dateTo?: string | null;
}

export interface IProductListParams extends IListParams {
  category?: number | null;
  stock?: 'in' | 'out' | null;
  sort?: 'newest' | 'price_asc' | 'price_desc' | null;
}

export function toQueryString(params: Record<string, any>): string {
  const search = new URLSearchParams();
  Object.keys(params).forEach(key => {
    const value = params[key];
    if (value !== null && value !== undefined && value !== '') {
      search.set(key, String(value));
    }
  });
  const query = search.toString();
  return query ? `?${query}` : '';
}
