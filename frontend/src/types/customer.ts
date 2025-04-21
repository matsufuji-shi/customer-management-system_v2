export interface Customer {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  company_name?: string;  // 任意項目
  created_at?: string;    // 取得時のみ使用
  updated_at?: string;    // 取得時のみ使用
}
