// import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import CustomerList from "./components/CustomerList"; //一覧
import CustomerForm from "./components/CustomerForm"; //追加・編集
import CustomerDetail from "./components/CustomerDetail"; //詳細


// 設定終わった後もこのエラーが出ている場合は確認する
function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/add-form" element={<CustomerForm />} />
          <Route path="/form/:id" element={<CustomerForm />} />
          <Route path="/detail/:id" element={<CustomerDetail />} />
        </Routes>
      </Router>
    );
  }

export default App;