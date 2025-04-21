import express, { Request, Response } from "express";
const router = express.Router(); // Routerを作成
import db from "../config/db"; 
import { Customer } from '../types/customer'; 

// タスク一覧を取得 (GET /customers)
router.get('/', (req: Request, res: Response) => {
  const sql = "SELECT * FROM customers";
  db.query(sql, (err: Error, result: Customer[]) => {  // 型指定を追加
    if (err) {
      console.error("Error retrieving customers: ", err);
      return res.status(500).send("タスクの取得に失敗しました");
    }
    res.json(result);
  });
});

// 特定のタスクを取得 (GET /customers/:id)
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = "SELECT * FROM customers WHERE id = ?";
  db.query(sql, [id], (err: Error, result: Customer[]) => {  // 型指定を追加
    if (err) {
      console.error("Error retrieving customer: ", err);
      return res.status(500).send("タスクの取得に失敗しました");
    }
    if (result.length === 0) {
      return res.status(404).send("タスクが見つかりません");
    }
    res.json(result[0]);
  });
});

// 新しいタスクを追加 (POST /customers)
router.post('/', (req: Request, res: Response): void  => {
  const { name, email, phone, address, company_name }: Customer = req.body;

  if (!name || !email || !phone || !address || !company_name) {
     res.status(400).json({ message: '全ての必須項目を入力してください。' });
     return;
  }

  const created_at = new Date();
  const updated_at = new Date();

  const sql = `
    INSERT INTO customers (name, email, phone, address, company_name, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, email, phone, address, company_name, created_at, updated_at], (err: Error, result: any) => {  // 型指定を追加
    if (err) {
      console.error("Error adding customer: ", err);
       res.status(500).json({ message: '顧客の追加に失敗しました' });
       return;
    }

    const insertedCustomer: Customer = {
      id: result.insertId,
      name,
      email,
      phone,
      address,
      company_name,
      created_at: created_at.toISOString(),
      updated_at: updated_at.toISOString()
    };

     res.status(201).json(insertedCustomer);
  });
});

// 特定のタスクを更新 (PUT /customers/:id)
router.put("/:id", (req: Request, res: Response): void  => {
  const { name, email, phone, address, company_name }: Customer = req.body;
  const { id } = req.params;

  if (!name || !email || !phone || !address || !company_name) {
     res.status(400).send("名前・メールアドレス・電話番号・住所・会社名の入力が必要です");
     return;
  }

  // まずは元の created_at を取得
  const getSql = "SELECT created_at FROM customers WHERE id = ?";
  db.query(getSql, [id], (err: Error, results: any[]) => {  // 型指定を追加
    if (err) {
      console.error("Error retrieving customer data: ", err);
       res.status(500).send("データ取得に失敗しました");
       return;
    }

    if (results.length === 0) {
       res.status(404).send("指定された顧客が見つかりません");
       return;
    }

    const created_at = results[0].created_at;
    const updated_at = new Date();

    const updateSql = `
      UPDATE customers
      SET name = ?, email = ?, phone = ?, address = ?, company_name = ?, created_at = ?, updated_at = ?
      WHERE id = ?
    `;
    db.query(updateSql, [name, email, phone, address, company_name, created_at, updated_at, id], (err: Error, result: any) => {  // 型指定を追加
      if (err) {
        console.error("Error updating customer: ", err);
         res.status(500).send("顧客の更新に失敗しました");
         return;
      }
       res.status(200).json({ message: "顧客情報を更新しました" });
       return;
    });
  });
});

// 特定のタスクを削除 (DELETE /customers/:id)
router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = "DELETE FROM customers WHERE id = ?";

  db.query(sql, [id], (err: Error, result: any) => {  // 型指定を追加
    if (err) {
      console.error("Error deleting customer: ", err);
      return res.status(500).send("顧客の削除に失敗しました");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("顧客が見つかりません");
    }
    res.status(200).json({ message: "顧客を削除しました" });
  });
});

export default router;