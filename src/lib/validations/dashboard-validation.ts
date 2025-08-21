export type LowStockDetail = {
  product_id: string; // UUID
  product_name: string;
  warehouse_id: string; // UUID
  warehouse_name: string;
  quantity: number;
  status: string;
  updated_by_email: string;
  updated_by_name: string;
  updated_at: string; // ISO date string
};

export type OutOfStockDetail = {
  product_id: string; // UUID
  product_name: string;
  warehouse_id: string; // UUID
  warehouse_name: string;
  quantity: number;
  status: string;
  updated_by_email: string;
  updated_by_name: string;
  updated_at: string; // ISO date string
};

export type RecentAddition = {
  product_id: string; // UUID
  product_name: string;
  created_by_email: string;
  created_by_name: string;
  created_at: string; // ISO date string
};

export type DashboardResponse = {
  total_stock: number;
  number_of_products: number;
  low_stock_items: LowStockDetail[];
  out_of_stock_items: OutOfStockDetail[];
  recent_additions: RecentAddition[];
};
