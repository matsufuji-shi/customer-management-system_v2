export interface Customer {
  id?: number; 
  name: string;
  email: string;
  phone: string;
  address: string;
  company_name?: string; // 任意入力
  created_at?: string;   // 自動生成
  updated_at?: string;   // 自動生成
}