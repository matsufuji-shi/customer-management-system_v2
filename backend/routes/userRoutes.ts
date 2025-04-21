const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// ユーザー一覧を取得する
router.get("/get/users", userController.getUsers);

// 新しいユーザーを追加する
router.post("/insert/user", userController.insertUser);

module.exports = router;
