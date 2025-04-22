import db from "../config/db"
import { Customer } from '../types/customer';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';

// 全顧客を取得する
const getCustomers = (req: Request, res: Response) => {
    const sqlSelect = "SELECT * FROM customers ORDER BY id";
    db.query(sqlSelect, (err: any, result: RowDataPacket[]) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error retrieving customers from the database");
        } else {
            res.send(result);
        }
    });
};

// 顧客を追加する
const addCustomers = (req: Request, res: Response) => {
    const { name, email, phone, address, company_name } = req.body;

    // --- バリデーション（必須項目のチェック） ---
    if (!name || !email || !phone || !address) {
        return res.status(400).json({ message: "全ての必須項目を入力してください。" });
    }

    const sqlInsert = `
        INSERT INTO customers (name, email, phone, address, company_name)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sqlInsert,
        [name, email, phone, address, company_name],
        (err: any, result: RowDataPacket[]) => {
            if (err) {
                console.error("データベースエラー:", err);
                return res.status(500).json({ message: "サーバーエラーが発生しました。再度お試しください。" });
            }

            return res.status(201).json({ message: "顧客情報が正常に追加されました。" });
        }
    );
};

// 顧客を更新する
const updateCustomers = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, phone, address, company_name } = req.body as Customer;
    const sqlUpdate = "UPDATE customers SET name = ?, email = ?, phone = ?, address = ?, company_name = ? WHERE id = ?";
    db.query(sqlUpdate, [name, email, phone, address, company_name, id], (err: any, result: RowDataPacket[]) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to update customer");
        } else {
            res.status(200).send("Customer updated successfully");
        }
    });
};

// 顧客を削除する
const deleteCustomers = (req: Request, res: Response) => {
    const { id } = req.params;
    const sqlDelete = "DELETE FROM customers WHERE id = ?";
    db.query(sqlDelete, [id], (err: any, result: RowDataPacket[]) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to delete customer");
        } else {
            res.status(200).send("Customer deleted successfully");
        }
    });
};

export { getCustomers, addCustomers, updateCustomers, deleteCustomers };