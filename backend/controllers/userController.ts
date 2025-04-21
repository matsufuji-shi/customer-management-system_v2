import { Request, Response } from "express"; // Express の型をインポート
const db = require("../db/connection");

// 全ユーザーを取得する
const getUsers = (req: Request, res: Response): void => {
    const sqlSelect = "SELECT * FROM users ORDER BY id";
    db.query(sqlSelect, (err: Error | null, result: any) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error retrieving users from the database");
        } else {
            res.send(result);
        }
    });
};

// 新しいユーザーを追加する
const insertUser = (req: Request, res: Response): void => {
    const { name, email } = req.body;
    const sqlInsert = "INSERT INTO users (name, email) VALUES (?, ?)";
    db.query(sqlInsert, [name, email], (err: Error | null, result: any) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to insert new user");
        } else {
            res.status(200).send("User added successfully");
        }
    });
};

module.exports = { getUsers, insertUser };