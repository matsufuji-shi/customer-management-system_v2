import express, { Request, Response } from "express";
import cors from "cors";
import db from "./config/db"; // DBの設定ファイルをインポート
import customersRouter from "./routes/customerRoutes"; // ルートのインポート

const app = express();

// ミドルウェアの設定
app.use(express.json()); // JSONパース
app.use(cors()); // CORS設定

// タスク管理用APIルートを追加
app.use("/api/customers", customersRouter);

// データベース接続確認
db.getConnection((err: Error | null, connection: any) => {
    if (err) {
        console.error("データベース接続エラー:", err);
        process.exit(1); // 接続失敗時にサーバを終了
    } else {
        console.log("データベース接続成功");
        connection.release(); // 接続が成功したらリリース
    }
});

// サーバーの起動
app.listen(3001, () => {
    console.log('Server running on port 3001');
});

export default app;